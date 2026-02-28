/**
 * Overlay — draws segmentation masks on the 2D overlay canvas.
 * Visual feedback for detected segments.
 */

/**
 * Draw segment masks and bounding boxes on overlay canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {import('../segmentation/tracker.js').TrackedSegment[]} segments
 * @param {Object} [opts]
 * @param {boolean} [opts.showMasks=true]
 * @param {boolean} [opts.showBoxes=true]
 * @param {boolean} [opts.showLabels=true]
 * @param {number} [opts.maskAlpha=0.35]
 * @param {number|null} [opts.highlightId=null] - Segment to highlight
 */
export function drawOverlay(canvas, segments, opts = {}) {
  const {
    showMasks = true,
    showBoxes = true,
    showLabels = true,
    maskAlpha = 0.35,
    highlightId = null,
  } = opts;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!segments || segments.length === 0) return;

  for (const seg of segments) {
    const [r, g, b] = seg.color;
    const isHighlighted = seg.trackId === highlightId;
    const alpha = isHighlighted ? 0.6 : maskAlpha;

    // Draw mask
    if (showMasks && seg.mask) {
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < seg.mask.length; i++) {
        if (seg.mask[i] > 0.5) {
          const pi = i * 4;
          data[pi] = r;
          data[pi + 1] = g;
          data[pi + 2] = b;
          data[pi + 3] = Math.floor(alpha * 255);
        }
      }

      ctx.putImageData(imgData, 0, 0);
    }

    // Draw bounding box
    if (showBoxes) {
      const [x1, y1, x2, y2] = seg.bbox;
      ctx.strokeStyle = `rgba(${r},${g},${b},${isHighlighted ? 1 : 0.7})`;
      ctx.lineWidth = isHighlighted ? 2 : 1;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    }

    // Draw label
    if (showLabels) {
      const [x1, y1] = seg.bbox;
      const label = `${seg.label} ${Math.round(seg.confidence * 100)}%`;
      const shaderLabel = seg.assignedShader ? ` → ${seg.assignedShader}` : '';

      ctx.font = '11px monospace';
      const textWidth = ctx.measureText(label + shaderLabel).width;

      // Background
      ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
      ctx.fillRect(x1, y1 - 16, textWidth + 8, 16);

      // Text
      ctx.fillStyle = '#fff';
      ctx.fillText(label, x1 + 4, y1 - 4);

      if (shaderLabel) {
        ctx.fillStyle = '#ffd700';
        ctx.fillText(shaderLabel, x1 + 4 + ctx.measureText(label).width, y1 - 4);
      }
    }
  }
}

/**
 * Find which segment is at a given canvas coordinate.
 * @param {import('../segmentation/tracker.js').TrackedSegment[]} segments
 * @param {number} x
 * @param {number} y
 * @param {number} canvasWidth
 * @returns {import('../segmentation/tracker.js').TrackedSegment|null}
 */
export function hitTestSegment(segments, x, y, canvasWidth) {
  if (!segments) return null;

  // Check from front (highest confidence) to back
  for (const seg of segments) {
    // Check bbox first (fast)
    const [x1, y1, x2, y2] = seg.bbox;
    if (x < x1 || x > x2 || y < y1 || y > y2) continue;

    // Check mask if available
    if (seg.mask) {
      const idx = Math.floor(y) * canvasWidth + Math.floor(x);
      if (seg.mask[idx] > 0.5) return seg;
    } else {
      return seg; // No mask, bbox hit is enough
    }
  }

  return null;
}
