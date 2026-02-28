/**
 * Camera & image input module.
 * Handles getUserMedia capture and static image loading.
 */

/** @type {MediaStream|null} */
let activeStream = null;

/** @type {HTMLVideoElement|null} */
let videoEl = null;

/**
 * Start camera capture and draw to canvas.
 * @param {HTMLCanvasElement} canvas - Target canvas for camera frames
 * @param {Object} [opts]
 * @param {number} [opts.width=1280]
 * @param {number} [opts.height=720]
 * @param {'user'|'environment'} [opts.facing='environment']
 * @returns {Promise<HTMLVideoElement>}
 */
export async function startCamera(canvas, opts = {}) {
  const { width = 1280, height = 720, facing = 'environment' } = opts;

  if (activeStream) stopCamera();

  const constraints = {
    video: {
      width: { ideal: width },
      height: { ideal: height },
      facingMode: { ideal: facing },
    },
    audio: false,
  };

  try {
    activeStream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    throw new Error(`Camera access denied: ${err.message}`);
  }

  videoEl = document.createElement('video');
  videoEl.srcObject = activeStream;
  videoEl.playsInline = true;
  videoEl.muted = true;
  await videoEl.play();

  // Match canvas to actual video resolution
  canvas.width = videoEl.videoWidth || width;
  canvas.height = videoEl.videoHeight || height;

  return videoEl;
}

/**
 * Stop active camera stream.
 */
export function stopCamera() {
  if (activeStream) {
    activeStream.getTracks().forEach(t => t.stop());
    activeStream = null;
  }
  if (videoEl) {
    videoEl.srcObject = null;
    videoEl = null;
  }
}

/**
 * Draw current video frame to canvas.
 * @param {HTMLCanvasElement} canvas
 * @returns {boolean} true if a frame was drawn
 */
export function drawVideoFrame(canvas) {
  if (!videoEl || videoEl.readyState < 2) return false;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  return true;
}

/**
 * Load an image file and draw to canvas.
 * @param {File} file
 * @param {HTMLCanvasElement} canvas
 * @returns {Promise<HTMLImageElement>}
 */
export async function loadImage(file, canvas) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Get current frame as ImageData from canvas.
 * @param {HTMLCanvasElement} canvas
 * @returns {ImageData}
 */
export function getFrameData(canvas) {
  const ctx = canvas.getContext('2d');
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * @returns {boolean} Whether camera is currently active
 */
export function isCameraActive() {
  return activeStream !== null && videoEl !== null;
}
