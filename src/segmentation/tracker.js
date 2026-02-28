/**
 * Segment tracker — maintains persistent IDs across frames.
 * Uses IoU (Intersection over Union) of bounding boxes to match
 * segments between consecutive frames.
 */

/**
 * @typedef {Object} TrackedSegment
 * @property {number} trackId - Persistent tracking ID
 * @property {number} classId
 * @property {string} label
 * @property {number} confidence
 * @property {number[]} bbox
 * @property {Float32Array|null} mask
 * @property {number[]} color
 * @property {number} age - Frames since first seen
 * @property {number} lastSeen - Frame number when last matched
 * @property {string|null} assignedShader - Shader assigned by user
 */

/** @type {TrackedSegment[]} */
let tracks = [];

/** @type {number} */
let nextTrackId = 1;

/** @type {number} */
let frameCount = 0;

/** How many frames to keep a lost track before removing */
const MAX_LOST_FRAMES = 30;

/** Minimum IoU to consider a match */
const IOU_THRESHOLD = 0.3;

/**
 * Update tracker with new segmentation results.
 * @param {import('./postprocess.js').Segment[]} segments - New frame segments
 * @returns {TrackedSegment[]} - Tracked segments with persistent IDs
 */
export function updateTracks(segments) {
  frameCount++;

  if (tracks.length === 0 && segments.length === 0) return [];

  // Build cost matrix (IoU between existing tracks and new segments)
  const matched = new Set();     // indices of matched new segments
  const matchedTracks = new Set(); // indices of matched existing tracks

  // Greedy matching by highest IoU (simple but effective for our use case)
  const pairs = [];
  for (let ti = 0; ti < tracks.length; ti++) {
    for (let si = 0; si < segments.length; si++) {
      const iou = computeIoU(tracks[ti].bbox, segments[si].bbox);
      // Also prefer same class
      const classBonus = tracks[ti].classId === segments[si].classId ? 0.1 : 0;
      pairs.push({ ti, si, score: iou + classBonus });
    }
  }

  // Sort by score descending
  pairs.sort((a, b) => b.score - a.score);

  for (const { ti, si, score } of pairs) {
    if (matchedTracks.has(ti) || matched.has(si)) continue;
    if (score < IOU_THRESHOLD) continue;

    // Update existing track
    tracks[ti].classId = segments[si].classId;
    tracks[ti].label = segments[si].label;
    tracks[ti].confidence = segments[si].confidence;
    tracks[ti].bbox = segments[si].bbox;
    tracks[ti].mask = segments[si].mask;
    tracks[ti].color = segments[si].color;
    tracks[ti].lastSeen = frameCount;
    tracks[ti].age++;

    matched.add(si);
    matchedTracks.add(ti);
  }

  // Create new tracks for unmatched segments
  for (let si = 0; si < segments.length; si++) {
    if (matched.has(si)) continue;
    tracks.push({
      trackId: nextTrackId++,
      classId: segments[si].classId,
      label: segments[si].label,
      confidence: segments[si].confidence,
      bbox: segments[si].bbox,
      mask: segments[si].mask,
      color: segments[si].color,
      age: 0,
      lastSeen: frameCount,
      assignedShader: null,
    });
  }

  // Remove tracks lost for too long
  tracks = tracks.filter(t => (frameCount - t.lastSeen) < MAX_LOST_FRAMES);

  return tracks;
}

/**
 * Get current tracked segments.
 * @returns {TrackedSegment[]}
 */
export function getTracks() {
  return tracks;
}

/**
 * Assign a shader to a tracked segment.
 * @param {number} trackId
 * @param {string|null} shaderId
 */
export function assignShader(trackId, shaderId) {
  const track = tracks.find(t => t.trackId === trackId);
  if (track) track.assignedShader = shaderId;
}

/**
 * Reset all tracks.
 */
export function resetTracks() {
  tracks = [];
  nextTrackId = 1;
  frameCount = 0;
}

/**
 * Compute IoU of two bounding boxes [x1, y1, x2, y2].
 */
function computeIoU(boxA, boxB) {
  const x1 = Math.max(boxA[0], boxB[0]);
  const y1 = Math.max(boxA[1], boxB[1]);
  const x2 = Math.min(boxA[2], boxB[2]);
  const y2 = Math.min(boxA[3], boxB[3]);

  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  if (intersection === 0) return 0;

  const areaA = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1]);
  const areaB = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1]);

  return intersection / (areaA + areaB - intersection);
}
