/**
 * VJ Mapper — Main entry point.
 * Orchestrates camera, segmentation, shaders, and compositing.
 */
import { startCamera, stopCamera, drawVideoFrame, loadImage, isCameraActive, getFrameData } from './camera.js';
import { initSegmentation, runSegmentation, isModelLoaded } from './segmentation/engine.js';
import { updateTracks, getTracks, assignShader, resetTracks } from './segmentation/tracker.js';
import { ShaderPipeline } from './shaders/pipeline.js';
import { Compositor } from './shaders/compositor.js';
import { drawOverlay, hitTestSegment } from './ui/overlay.js';
import { renderShaderList, renderSegmentList, renderMappingList, updateFPS, updateSegStatus } from './ui/controls.js';

// ─── DOM Elements ───
const canvasSource = document.getElementById('canvas-source');
const canvasOverlay = document.getElementById('canvas-overlay');
const canvasOutput = document.getElementById('canvas-output');
const fpsDisplay = document.getElementById('fps-display');
const segStatus = document.getElementById('seg-status');
const segmentListEl = document.getElementById('segment-list');
const shaderListEl = document.getElementById('shader-list');
const mappingListEl = document.getElementById('mapping-list');

const btnCamera = document.getElementById('btn-camera');
const btnImage = document.getElementById('btn-image');
const btnSegment = document.getElementById('btn-segment');
const btnFullscreen = document.getElementById('btn-fullscreen');
const chkOverlay = document.getElementById('chk-overlay');
const chkShaders = document.getElementById('chk-shaders');
const fileImage = document.getElementById('file-image');
const modalModel = document.getElementById('modal-model');
const btnCloseModal = document.getElementById('btn-close-modal');
const modelDropzone = document.getElementById('model-dropzone');

// Model URL (Ultralytics official ONNX release)
const MODEL_LOCAL = import.meta.env.BASE_URL + 'models/yolo11n-seg.onnx';

// ─── State ───
let pipeline = null;
let compositor = null;
let highlightedSegment = null;
let mousePos = [0, 0];
let isLiveMode = false; // continuous segmentation
let segFrameSkip = 5; // segment every N frames
let frameCounter = 0;
let lastFrameTime = performance.now();
let fpsHistory = [];

// ─── Initialize ───
async function init() {
  console.log('[vjm] Initializing VJ Mapper...');

  // Init WebGL on output canvas
  const gl = canvasOutput.getContext('webgl2', {
    alpha: true,
    antialias: false,
    premultipliedAlpha: false,
  });

  if (!gl) {
    alert('WebGL2 not supported in this browser.');
    return;
  }

  // Create shader pipeline and compositor
  pipeline = new ShaderPipeline(gl, canvasOutput.width, canvasOutput.height);
  compositor = new Compositor(gl, canvasOutput.width, canvasOutput.height);

  // Render shader list in UI
  renderShaderList(shaderListEl, pipeline.getShaderList());

  // Load model — try local first, then auto-download
  await loadModel();

  // Start camera by default
  try {
    await startCamera(canvasSource);
    syncCanvasSizes();
    btnCamera.classList.add('active');
    btnImage.classList.remove('active');
  } catch (err) {
    console.warn('[vjm] Camera not available:', err.message);
  }

  // Start render loop
  requestAnimationFrame(renderLoop);
}

// ─── Render Loop ───
function renderLoop() {
  const now = performance.now();
  const dt = now - lastFrameTime;
  lastFrameTime = now;

  // FPS tracking
  fpsHistory.push(dt);
  if (fpsHistory.length > 30) fpsHistory.shift();
  const avgDt = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;
  updateFPS(fpsDisplay, 1000 / avgDt);

  frameCounter++;

  // Draw camera frame to source canvas
  if (isCameraActive()) {
    drawVideoFrame(canvasSource);
  }

  // Run segmentation periodically in live mode
  if (isLiveMode && isModelLoaded() && frameCounter % segFrameSkip === 0) {
    runSegmentationFrame();
  }

  // Draw overlay
  if (chkOverlay.checked) {
    drawOverlay(canvasOverlay, getTracks(), {
      highlightId: highlightedSegment,
    });
  } else {
    const ctx = canvasOverlay.getContext('2d');
    ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
  }

  // Render shaders and composite
  if (chkShaders.checked && pipeline && compositor) {
    pipeline.render(mousePos);

    // Build layers from tracked segments with assigned shaders
    const tracks = getTracks();
    const layers = [];

    for (const track of tracks) {
      if (!track.assignedShader) continue;
      const tex = pipeline.getTexture(track.assignedShader);
      if (!tex) continue;

      // Update mask texture
      if (track.mask) {
        compositor.updateMask(track.trackId, track.mask, canvasSource.width, canvasSource.height);
      }

      layers.push({
        segmentId: track.trackId,
        shaderTexture: tex,
        opacity: 1.0,
      });
    }

    // Update background
    compositor.updateBackground(canvasSource);

    // Composite to screen
    compositor.composite(layers, { showBackground: true });
  }

  requestAnimationFrame(renderLoop);
}

// ─── Model Loading ───
async function loadModel() {
  updateSegStatus(segStatus, 'loading model...');
  try {
    // Fetch as ArrayBuffer for reliable cross-origin loading
    console.log('[vjm] Fetching model from:', MODEL_LOCAL);
    const resp = await fetch(MODEL_LOCAL);
    if (!resp.ok) throw new Error(`Model fetch failed: HTTP ${resp.status}`);
    const buffer = await resp.arrayBuffer();
    console.log(`[vjm] Model downloaded: ${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB`);
    await initSegmentation(buffer);
    updateSegStatus(segStatus, 'ready');
  } catch (err) {
    console.error('[vjm] Model load failed:', err);
    updateSegStatus(segStatus, 'no model');
    modalModel.classList.remove('hidden');
  }
}

// ─── Segmentation ───
async function runSegmentationFrame() {
  if (!isModelLoaded()) {
    modalModel.classList.remove('hidden');
    return;
  }

  updateSegStatus(segStatus, 'running...');

  try {
    const imageData = getFrameData(canvasSource);
    const result = await runSegmentation(imageData);

    if (result) {
      const tracks = updateTracks(result.segments);
      updateSegStatus(segStatus, `${tracks.length} segs (${Math.round(result.inferenceTime)}ms)`);

      // Re-render segment list
      renderSegmentList(segmentListEl, tracks, pipeline.getShaderList(), onAssignShader, onHoverSegment);
      renderMappingList(mappingListEl, tracks);
    }
  } catch (err) {
    console.error('[vjm] Segmentation error:', err);
    updateSegStatus(segStatus, 'error');
  }
}

// ─── Event Handlers ───
function onAssignShader(trackId, shaderId) {
  assignShader(trackId, shaderId);
  renderMappingList(mappingListEl, getTracks());
}

function onHoverSegment(trackId) {
  highlightedSegment = trackId;
}

function syncCanvasSizes() {
  const w = canvasSource.width;
  const h = canvasSource.height;
  canvasOverlay.width = w;
  canvasOverlay.height = h;
  canvasOutput.width = w;
  canvasOutput.height = h;

  if (pipeline) pipeline.resize(w, h);
  if (compositor) compositor.resize(w, h);
}

// ─── UI Event Bindings ───
btnCamera.addEventListener('click', async () => {
  try {
    await startCamera(canvasSource);
    syncCanvasSizes();
    btnCamera.classList.add('active');
    btnImage.classList.remove('active');
  } catch (err) {
    alert(`Camera error: ${err.message}`);
  }
});

btnImage.addEventListener('click', () => {
  fileImage.click();
});

fileImage.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  stopCamera();
  await loadImage(file, canvasSource);
  syncCanvasSizes();
  btnCamera.classList.remove('active');
  btnImage.classList.add('active');
});

btnSegment.addEventListener('click', () => {
  if (isLiveMode) {
    isLiveMode = false;
    btnSegment.textContent = '▶ Segment';
    updateSegStatus(segStatus, 'paused');
  } else {
    // Single shot or toggle live
    if (isCameraActive()) {
      isLiveMode = true;
      btnSegment.textContent = '⏸ Stop';
    }
    runSegmentationFrame();
  }
});

btnFullscreen.addEventListener('click', () => {
  // Open output in a new window for projector
  const win = window.open('', 'vj-output', 'fullscreen=yes');
  if (!win) {
    alert('Popup blocked. Allow popups for fullscreen output.');
    return;
  }

  win.document.title = 'VJ Output';
  win.document.body.style.cssText = 'margin:0;padding:0;background:#000;overflow:hidden;';

  const outCanvas = win.document.createElement('canvas');
  outCanvas.width = canvasOutput.width;
  outCanvas.height = canvasOutput.height;
  outCanvas.style.cssText = 'width:100vw;height:100vh;object-fit:contain;display:block;';
  win.document.body.appendChild(outCanvas);

  // Mirror output canvas to the new window
  const mirrorCtx = outCanvas.getContext('2d');
  function mirror() {
    if (win.closed) return;
    mirrorCtx.drawImage(canvasOutput, 0, 0, outCanvas.width, outCanvas.height);
    requestAnimationFrame(mirror);
  }
  mirror();

  // Fullscreen on click
  outCanvas.addEventListener('click', () => {
    outCanvas.requestFullscreen?.() || outCanvas.webkitRequestFullscreen?.();
  });
});

btnCloseModal.addEventListener('click', () => {
  modalModel.classList.add('hidden');
});

// Model drag & drop
modelDropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  modelDropzone.classList.add('dragover');
});

modelDropzone.addEventListener('dragleave', () => {
  modelDropzone.classList.remove('dragover');
});

modelDropzone.addEventListener('drop', async (e) => {
  e.preventDefault();
  modelDropzone.classList.remove('dragover');

  const file = e.dataTransfer.files?.[0];
  if (!file || !file.name.endsWith('.onnx')) {
    modelDropzone.textContent = 'Please drop a .onnx file';
    return;
  }

  modelDropzone.textContent = 'Loading model...';
  try {
    const buffer = await file.arrayBuffer();
    await initSegmentation(buffer);
    updateSegStatus(segStatus, 'ready');
    modalModel.classList.add('hidden');
  } catch (err) {
    modelDropzone.textContent = `Error: ${err.message}`;
  }
});

// Track mouse for shader uniform
canvasOutput.addEventListener('mousemove', (e) => {
  const rect = canvasOutput.getBoundingClientRect();
  mousePos = [
    (e.clientX - rect.left) / rect.width,
    1 - (e.clientY - rect.top) / rect.height,
  ];
});

// Click on overlay to select segment
canvasOverlay.addEventListener('click', (e) => {
  const rect = canvasOverlay.getBoundingClientRect();
  const scaleX = canvasOverlay.width / rect.width;
  const scaleY = canvasOverlay.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const hit = hitTestSegment(getTracks(), x, y, canvasOverlay.width);
  if (hit) {
    highlightedSegment = hit.trackId;
    console.log(`[vjm] Selected segment: ${hit.label} (track ${hit.trackId})`);
  }
});

// ─── Start ───
init();
