/**
 * YOLO26-seg post-processing.
 * Parses ONNX output tensors into usable segments with masks.
 *
 * YOLO26 seg output format (end-to-end, NMS-free):
 * - Detection output: [1, num_dets, 4+1+num_classes+mask_coeffs]
 *   or separate outputs for boxes, scores, classes, mask_protos
 *
 * Since exact output format may vary, we handle multiple layouts gracefully.
 */

/**
 * @typedef {Object} Segment
 * @property {number} id - Unique segment ID
 * @property {number} classId - COCO class ID
 * @property {string} label - Human-readable class name
 * @property {number} confidence - Detection confidence [0,1]
 * @property {number[]} bbox - [x1, y1, x2, y2] in source image coords
 * @property {Float32Array} mask - Binary mask at source resolution (flattened, 0 or 1)
 * @property {number[]} color - [r, g, b] display color
 */

/**
 * @typedef {Object} SegmentationResult
 * @property {Segment[]} segments
 * @property {number} inferenceTime - ms
 */

// COCO class names (80 classes)
const COCO_CLASSES = [
  'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck',
  'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench',
  'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra',
  'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
  'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove',
  'skateboard', 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup',
  'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange',
  'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
  'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse',
  'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink',
  'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
  'hair drier', 'toothbrush',
];

// Distinct colors for segments
const SEGMENT_COLORS = [
  [255, 0, 85], [0, 255, 170], [255, 170, 0], [0, 85, 255],
  [255, 0, 255], [0, 255, 0], [255, 85, 0], [85, 0, 255],
  [0, 255, 255], [255, 255, 0], [170, 0, 255], [0, 170, 255],
  [255, 0, 170], [85, 255, 0], [0, 255, 85], [170, 255, 0],
];

/**
 * Post-process YOLO26-seg ONNX output.
 * @param {Object} results - ONNX inference results
 * @param {Object} opts
 * @param {number} opts.srcWidth - Original image width
 * @param {number} opts.srcHeight - Original image height
 * @param {number} opts.modelSize - Model input size (640)
 * @param {number} opts.confThreshold - Confidence threshold
 * @param {number} opts.maskThreshold - Mask binarization threshold
 * @returns {SegmentationResult}
 */
export function postprocessYolo26Seg(results, opts) {
  const t0 = performance.now();
  const { srcWidth, srcHeight, modelSize, confThreshold, maskThreshold } = opts;

  const outputNames = Object.keys(results);
  console.log('[seg] Output tensors:', outputNames.map(n => `${n}: ${results[n].dims}`));

  // Try to detect output format
  const segments = parseOutputs(results, outputNames, {
    srcWidth, srcHeight, modelSize, confThreshold, maskThreshold,
  });

  return {
    segments,
    inferenceTime: performance.now() - t0,
  };
}

/**
 * Parse outputs — handles different possible YOLO26-seg output layouts.
 */
function parseOutputs(results, names, opts) {
  const { srcWidth, srcHeight, modelSize, confThreshold, maskThreshold } = opts;

  // Compute letterbox params for coordinate mapping
  const scale = Math.min(modelSize / srcWidth, modelSize / srcHeight);
  const padX = (modelSize - srcWidth * scale) / 2;
  const padY = (modelSize - srcHeight * scale) / 2;

  const segments = [];
  let segId = 0;

  // Strategy 1: Single output tensor with shape [1, N, 4+1+80+32] (YOLOv8-style)
  // Strategy 2: Multiple outputs (boxes, scores, labels, masks, protos)
  // We try to handle both gracefully

  // Find the main detection tensor (usually the largest non-proto one)
  let detTensor = null;
  let protoTensor = null;

  for (const name of names) {
    const t = results[name];
    const dims = t.dims;

    // Proto masks are typically [1, 32, H, H] where H = modelSize/4 = 160
    if (dims.length === 4 && dims[1] === 32) {
      protoTensor = t;
      continue;
    }

    // Detection output: [1, N, C] or [1, C, N] where C > 4
    if (dims.length === 3) {
      detTensor = t;
    }
  }

  if (!detTensor) {
    console.warn('[seg] Could not find detection tensor in outputs');
    return [];
  }

  const detDims = detTensor.dims;
  const detData = detTensor.data;

  // Determine layout: [1, N, C] vs [1, C, N]
  // If detDims[2] > detDims[1], it's probably [1, C, N] and needs transpose
  let numDets, numChannels;
  let transposed = false;

  if (detDims[2] > detDims[1] && detDims[1] < 200) {
    // [1, C, N] layout — need to read column-wise
    numChannels = detDims[1];
    numDets = detDims[2];
    transposed = true;
  } else {
    // [1, N, C] layout
    numDets = detDims[1];
    numChannels = detDims[2];
  }

  // Expected channels: 4 (box) + 80 (classes) + 32 (mask coefficients) = 116
  // Or with conf: 4 + 1 + 80 + 32 = 117
  const hasMaskCoeffs = protoTensor !== null;
  const numMaskCoeffs = hasMaskCoeffs ? 32 : 0;
  const hasObjConf = (numChannels === 117 + numMaskCoeffs) || (numChannels === 85 + numMaskCoeffs);
  const numClasses = hasObjConf ? numChannels - 5 - numMaskCoeffs : numChannels - 4 - numMaskCoeffs;

  const protoData = protoTensor?.data;
  const protoH = protoTensor ? protoTensor.dims[2] : 0;
  const protoW = protoTensor ? protoTensor.dims[3] : 0;

  for (let i = 0; i < numDets; i++) {
    // Read values based on layout
    const val = (ch) => transposed
      ? detData[ch * numDets + i]
      : detData[i * numChannels + ch];

    // Box: cx, cy, w, h (in model coords)
    const cx = val(0);
    const cy = val(1);
    const w = val(2);
    const h = val(3);

    // Class scores start at channel 4 (no obj conf in YOLO26 e2e)
    const classOffset = hasObjConf ? 5 : 4;

    // Find best class
    let bestClass = 0;
    let bestScore = -1;
    for (let c = 0; c < Math.min(numClasses, 80); c++) {
      const score = val(classOffset + c);
      if (score > bestScore) {
        bestScore = score;
        bestClass = c;
      }
    }

    // Apply obj conf if present
    if (hasObjConf) {
      bestScore *= val(4);
    }

    if (bestScore < confThreshold) continue;

    // Convert box from model coords to source coords (undo letterbox)
    const x1 = Math.max(0, ((cx - w / 2) - padX) / scale);
    const y1 = Math.max(0, ((cy - h / 2) - padY) / scale);
    const x2 = Math.min(srcWidth, ((cx + w / 2) - padX) / scale);
    const y2 = Math.min(srcHeight, ((cy + h / 2) - padY) / scale);

    // Generate mask from proto + coefficients
    let mask = null;
    if (hasMaskCoeffs && protoData) {
      const coeffOffset = classOffset + numClasses;
      const coeffs = new Float32Array(numMaskCoeffs);
      for (let mc = 0; mc < numMaskCoeffs; mc++) {
        coeffs[mc] = val(coeffOffset + mc);
      }

      mask = generateMask(
        coeffs, protoData, protoH, protoW,
        x1, y1, x2, y2,
        srcWidth, srcHeight, scale, padX, padY,
        maskThreshold
      );
    }

    const color = SEGMENT_COLORS[segId % SEGMENT_COLORS.length];

    segments.push({
      id: segId++,
      classId: bestClass,
      label: COCO_CLASSES[bestClass] || `class_${bestClass}`,
      confidence: bestScore,
      bbox: [x1, y1, x2, y2],
      mask,
      color,
    });
  }

  // Sort by confidence (highest first)
  segments.sort((a, b) => b.confidence - a.confidence);

  // Re-assign sequential IDs
  segments.forEach((s, i) => { s.id = i; });

  console.log(`[seg] Found ${segments.length} segments`);
  return segments;
}

/**
 * Generate instance mask from proto masks and coefficients.
 * Proto shape: [32, protoH, protoW]
 * Result: binary mask at source resolution.
 */
function generateMask(coeffs, protoData, protoH, protoW, x1, y1, x2, y2, srcW, srcH, scale, padX, padY, threshold) {
  // Compute mask at proto resolution first
  const protoMask = new Float32Array(protoH * protoW);

  for (let py = 0; py < protoH; py++) {
    for (let px = 0; px < protoW; px++) {
      let sum = 0;
      for (let c = 0; c < 32; c++) {
        sum += coeffs[c] * protoData[c * protoH * protoW + py * protoW + px];
      }
      // Sigmoid
      protoMask[py * protoW + px] = 1 / (1 + Math.exp(-sum));
    }
  }

  // Resize mask to source resolution and crop to bbox
  const mask = new Float32Array(srcW * srcH);
  const scaleX = protoW / (srcW * scale + padX * 2) * (srcW * scale);
  const scaleY = protoH / (srcH * scale + padY * 2) * (srcH * scale);

  for (let sy = Math.floor(y1); sy < Math.min(Math.ceil(y2), srcH); sy++) {
    for (let sx = Math.floor(x1); sx < Math.min(Math.ceil(x2), srcW); sx++) {
      // Map source pixel to proto pixel
      const px = ((sx * scale + padX) / (srcW * scale + padX * 2)) * protoW;
      const py = ((sy * scale + padY) / (srcH * scale + padY * 2)) * protoH;

      const pxi = Math.min(Math.floor(px), protoW - 1);
      const pyi = Math.min(Math.floor(py), protoH - 1);

      const val = protoMask[pyi * protoW + pxi];
      mask[sy * srcW + sx] = val >= threshold ? 1 : 0;
    }
  }

  return mask;
}
