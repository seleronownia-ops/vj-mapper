/**
 * UI Controls — manages the side panel, segment list, shader assignments.
 */

/**
 * Populate the shader list in the panel.
 * @param {HTMLElement} container - #shader-list element
 * @param {Array<{ id: string, name: string, description: string }>} shaders
 */
export function renderShaderList(container, shaders) {
  container.innerHTML = '';

  for (const shader of shaders) {
    const el = document.createElement('div');
    el.className = 'shader-item';
    el.dataset.shaderId = shader.id;
    el.innerHTML = `
      <canvas class="shader-preview" width="32" height="32"></canvas>
      <span>${shader.name || shader.id}</span>
    `;
    container.appendChild(el);
  }
}

/**
 * Populate the segment list with shader assignment dropdowns.
 * @param {HTMLElement} container - #segment-list element
 * @param {import('../segmentation/tracker.js').TrackedSegment[]} segments
 * @param {Array<{ id: string, name: string }>} shaders
 * @param {Function} onAssign - Callback(trackId, shaderId)
 * @param {Function} onHover - Callback(trackId | null)
 */
export function renderSegmentList(container, segments, shaders, onAssign, onHover) {
  container.innerHTML = '';

  if (!segments || segments.length === 0) {
    container.innerHTML = '<p class="placeholder">Run segmentation to detect regions</p>';
    return;
  }

  for (const seg of segments) {
    const [r, g, b] = seg.color;

    const el = document.createElement('div');
    el.className = 'segment-item';
    el.dataset.trackId = seg.trackId;

    // Shader dropdown options
    const options = shaders.map(s =>
      `<option value="${s.id}" ${seg.assignedShader === s.id ? 'selected' : ''}>${s.name || s.id}</option>`
    ).join('');

    el.innerHTML = `
      <span class="segment-color" style="background: rgb(${r},${g},${b})"></span>
      <span class="segment-label">${seg.label} <small>${Math.round(seg.confidence * 100)}%</small></span>
      <select>
        <option value="">none</option>
        ${options}
      </select>
    `;

    // Events
    const select = el.querySelector('select');
    select.addEventListener('change', () => {
      onAssign(seg.trackId, select.value || null);
    });

    el.addEventListener('mouseenter', () => onHover(seg.trackId));
    el.addEventListener('mouseleave', () => onHover(null));

    container.appendChild(el);
  }
}

/**
 * Render mapping summary (segment → shader assignments).
 * @param {HTMLElement} container - #mapping-list element
 * @param {import('../segmentation/tracker.js').TrackedSegment[]} segments
 */
export function renderMappingList(container, segments) {
  const assigned = segments?.filter(s => s.assignedShader) ?? [];

  if (assigned.length === 0) {
    container.innerHTML = '<p class="placeholder">Assign shaders to segments above</p>';
    return;
  }

  container.innerHTML = '';
  for (const seg of assigned) {
    const [r, g, b] = seg.color;
    const el = document.createElement('div');
    el.className = 'mapping-item';
    el.innerHTML = `
      <span class="segment-color" style="background: rgb(${r},${g},${b})"></span>
      <span>${seg.label}</span>
      <span style="color: var(--text-dim)">→</span>
      <span style="color: var(--accent)">${seg.assignedShader}</span>
    `;
    container.appendChild(el);
  }
}

/**
 * Update FPS display.
 * @param {HTMLElement} el
 * @param {number} fps
 */
export function updateFPS(el, fps) {
  el.textContent = `${Math.round(fps)} fps`;
}

/**
 * Update segmentation status display.
 * @param {HTMLElement} el
 * @param {string} status
 */
export function updateSegStatus(el, status) {
  el.textContent = `seg: ${status}`;
}
