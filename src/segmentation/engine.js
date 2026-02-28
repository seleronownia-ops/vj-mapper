/**
 * Segmentation engine — ONNX Runtime Web wrapper for YOLO26n-seg.
 * Handles model loading, preprocessing, inference, and output routing.
 */
import * as ort from 'onnxruntime-web';
import { postprocessYolo26Seg } from './postprocess.js';

/** @type {ort.InferenceSession|null} */
let session = null;

/** @type {boolean} */
let isRunning = false;

/** Model input size (YOLO26 default) */
const MODEL_SIZE = 640;

/**
 * Initialize ONNX Runtime and load model.
 * @param {string|ArrayBuffer} modelSource - URL path or ArrayBuffer of .onnx file
 * @param {Object} [opts]
 * @param {'webgl'|'wasm'|'webgpu'} [opts.backend='webgl']
 * @returns {Promise<void>}
 */
export async function initSegmentation(modelSource, opts = {}) {
  const { backend = 'webgl' } = opts;

  // Configure ONNX Runtime
  ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

  const sessionOpts = {
    executionProviders: [backend, 'wasm'], // fallback chain
    graphOptimizationLevel: 'all',
  };

  try {
    if (modelSource instanceof ArrayBuffer) {
      session = await ort.InferenceSession.create(modelSource, sessionOpts);
    } else {
      session = await ort.InferenceSession.create(modelSource, sessionOpts);
    }
    console.log('[seg] Model loaded. Inputs:', session.inputNames, 'Outputs:', session.outputNames);
  } catch (err) {
    session = null;
    throw new Error(`Failed to load segmentation model: ${err.message}`);
  }
}

/**
 * Run segmentation on an image/frame.
 * @param {ImageData} imageData - Source frame
 * @param {Object} [opts]
 * @param {number} [opts.confThreshold=0.35]
 * @param {number} [opts.maskThreshold=0.5]
 * @returns {Promise<import('./postprocess.js').SegmentationResult>}
 */
export async function runSegmentation(imageData, opts = {}) {
  if (!session) throw new Error('Model not loaded');
  if (isRunning) return null; // Skip if already processing

  isRunning = true;
  try {
    const { confThreshold = 0.35, maskThreshold = 0.5 } = opts;

    // Preprocess: resize to MODEL_SIZE x MODEL_SIZE, normalize, NCHW format
    const tensor = preprocess(imageData);

    // Run inference
    const feeds = { [session.inputNames[0]]: tensor };
    const results = await session.run(feeds);

    // Post-process
    const segments = postprocessYolo26Seg(results, {
      srcWidth: imageData.width,
      srcHeight: imageData.height,
      modelSize: MODEL_SIZE,
      confThreshold,
      maskThreshold,
    });

    return segments;
  } finally {
    isRunning = false;
  }
}

/**
 * Preprocess ImageData to ONNX tensor.
 * Resize to 640x640, normalize to [0,1], convert to NCHW Float32.
 * @param {ImageData} imageData
 * @returns {ort.Tensor}
 */
function preprocess(imageData) {
  // Use offscreen canvas for resize
  const canvas = new OffscreenCanvas(MODEL_SIZE, MODEL_SIZE);
  const ctx = canvas.getContext('2d');

  // Create ImageBitmap-compatible source
  const srcCanvas = new OffscreenCanvas(imageData.width, imageData.height);
  const srcCtx = srcCanvas.getContext('2d');
  srcCtx.putImageData(imageData, 0, 0);

  // Resize with letterboxing (maintain aspect ratio)
  const scale = Math.min(MODEL_SIZE / imageData.width, MODEL_SIZE / imageData.height);
  const newW = Math.round(imageData.width * scale);
  const newH = Math.round(imageData.height * scale);
  const padX = (MODEL_SIZE - newW) / 2;
  const padY = (MODEL_SIZE - newH) / 2;

  ctx.fillStyle = '#808080'; // Gray padding (YOLO convention)
  ctx.fillRect(0, 0, MODEL_SIZE, MODEL_SIZE);
  ctx.drawImage(srcCanvas, padX, padY, newW, newH);

  const pixels = ctx.getImageData(0, 0, MODEL_SIZE, MODEL_SIZE).data;

  // Convert to NCHW Float32 normalized [0,1]
  const float32 = new Float32Array(3 * MODEL_SIZE * MODEL_SIZE);
  const channelSize = MODEL_SIZE * MODEL_SIZE;

  for (let i = 0; i < channelSize; i++) {
    const pi = i * 4;
    float32[i] = pixels[pi] / 255;                    // R
    float32[channelSize + i] = pixels[pi + 1] / 255;  // G
    float32[2 * channelSize + i] = pixels[pi + 2] / 255; // B
  }

  return new ort.Tensor('float32', float32, [1, 3, MODEL_SIZE, MODEL_SIZE]);
}

/**
 * @returns {boolean} Whether model is loaded and ready
 */
export function isModelLoaded() {
  return session !== null;
}

/**
 * @returns {boolean} Whether inference is currently running
 */
export function isInferenceRunning() {
  return isRunning;
}
