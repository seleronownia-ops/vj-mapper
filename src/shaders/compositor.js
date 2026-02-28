/**
 * Compositor — blends shader outputs using segment masks.
 *
 * Each segment has an assigned shader. The compositor:
 * 1. Takes the rendered shader textures from the pipeline
 * 2. Takes segment masks (uploaded as textures)
 * 3. Composites: for each pixel, blend the assigned shader output
 *    where the segment mask is active
 */
import { createProgram, createFullscreenQuad, createTexture, FULLSCREEN_VERT } from '../utils/webgl.js';

/** Max simultaneous segments we can composite in one pass */
const MAX_LAYERS = 16;

const COMPOSITE_FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

// Camera/background
uniform sampler2D u_background;
uniform bool u_showBackground;

// Layer textures and masks
uniform sampler2D u_layer[${MAX_LAYERS}];
uniform sampler2D u_mask[${MAX_LAYERS}];
uniform int u_numLayers;
uniform float u_opacity[${MAX_LAYERS}];

void main() {
  // Start with background (camera feed) or black
  vec4 col = u_showBackground ? texture(u_background, v_uv) : vec4(0.0, 0.0, 0.0, 1.0);

  // Composite layers (segments with shaders) back to front
  for (int i = 0; i < ${MAX_LAYERS}; i++) {
    if (i >= u_numLayers) break;
    float maskVal = texture(u_mask[i], v_uv).r;
    if (maskVal > 0.01) {
      vec4 layerCol = texture(u_layer[i], v_uv);
      float alpha = maskVal * u_opacity[i];
      col.rgb = mix(col.rgb, layerCol.rgb, alpha);
    }
  }

  fragColor = col;
}`;

export class Compositor {
  /** @type {WebGL2RenderingContext} */
  #gl;

  /** @type {WebGLProgram} */
  #program;

  /** @type {WebGLVertexArrayObject} */
  #quad;

  /** @type {Map<number, WebGLTexture>} */
  #maskTextures = new Map();

  /** @type {number} */
  #width;

  /** @type {number} */
  #height;

  /** @type {WebGLTexture} */
  #bgTexture;

  /** @type {Object<string, WebGLUniformLocation>} */
  #locations = {};

  /**
   * @param {WebGL2RenderingContext} gl
   * @param {number} width
   * @param {number} height
   */
  constructor(gl, width, height) {
    this.#gl = gl;
    this.#width = width;
    this.#height = height;
    this.#quad = createFullscreenQuad(gl);
    this.#program = createProgram(gl, FULLSCREEN_VERT, COMPOSITE_FRAG);

    // Create background texture
    this.#bgTexture = createTexture(gl, width, height);

    // Cache uniform locations
    const p = this.#program;
    this.#locations.u_background = gl.getUniformLocation(p, 'u_background');
    this.#locations.u_showBackground = gl.getUniformLocation(p, 'u_showBackground');
    this.#locations.u_numLayers = gl.getUniformLocation(p, 'u_numLayers');

    for (let i = 0; i < MAX_LAYERS; i++) {
      this.#locations[`u_layer[${i}]`] = gl.getUniformLocation(p, `u_layer[${i}]`);
      this.#locations[`u_mask[${i}]`] = gl.getUniformLocation(p, `u_mask[${i}]`);
      this.#locations[`u_opacity[${i}]`] = gl.getUniformLocation(p, `u_opacity[${i}]`);
    }
  }

  /**
   * Upload background (camera frame) texture.
   * @param {HTMLCanvasElement|HTMLVideoElement|ImageData} source
   */
  updateBackground(source) {
    const gl = this.#gl;
    gl.bindTexture(gl.TEXTURE_2D, this.#bgTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  }

  /**
   * Upload a segment mask as a texture.
   * @param {number} segmentId - Track ID
   * @param {Float32Array} mask - Flattened mask (0/1 values)
   * @param {number} width
   * @param {number} height
   */
  updateMask(segmentId, mask, width, height) {
    const gl = this.#gl;

    // Convert Float32Array mask to R8 texture data
    const data = new Uint8Array(width * height);
    for (let i = 0; i < mask.length; i++) {
      data[i] = mask[i] > 0.5 ? 255 : 0;
    }

    let tex = this.#maskTextures.get(segmentId);
    if (!tex) {
      tex = createTexture(gl, width, height, null, {
        internalFormat: gl.R8,
        format: gl.RED,
        type: gl.UNSIGNED_BYTE,
      });
      this.#maskTextures.set(segmentId, tex);
    }

    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, width, height, 0, gl.RED, gl.UNSIGNED_BYTE, data);
  }

  /**
   * Composite shader outputs using segment masks to the screen.
   * @param {Array<{ segmentId: number, shaderTexture: WebGLTexture, opacity: number }>} layers
   * @param {Object} [opts]
   * @param {boolean} [opts.showBackground=true]
   * @param {WebGLFramebuffer|null} [opts.target=null] - Render target (null = screen)
   */
  composite(layers, opts = {}) {
    const gl = this.#gl;
    const { showBackground = true, target = null } = opts;

    gl.bindFramebuffer(gl.FRAMEBUFFER, target);
    gl.viewport(0, 0, this.#width, this.#height);
    gl.useProgram(this.#program);
    gl.bindVertexArray(this.#quad);

    // Background at texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.#bgTexture);
    gl.uniform1i(this.#locations.u_background, 0);
    gl.uniform1i(this.#locations.u_showBackground, showBackground ? 1 : 0);

    // Bind layer textures and masks
    const numLayers = Math.min(layers.length, MAX_LAYERS);
    gl.uniform1i(this.#locations.u_numLayers, numLayers);

    for (let i = 0; i < numLayers; i++) {
      const layer = layers[i];

      // Shader texture at unit 1 + i*2
      const layerUnit = 1 + i * 2;
      gl.activeTexture(gl.TEXTURE0 + layerUnit);
      gl.bindTexture(gl.TEXTURE_2D, layer.shaderTexture);
      gl.uniform1i(this.#locations[`u_layer[${i}]`], layerUnit);

      // Mask texture at unit 2 + i*2
      const maskUnit = 2 + i * 2;
      const maskTex = this.#maskTextures.get(layer.segmentId);
      gl.activeTexture(gl.TEXTURE0 + maskUnit);
      gl.bindTexture(gl.TEXTURE_2D, maskTex || this.#bgTexture); // fallback
      gl.uniform1i(this.#locations[`u_mask[${i}]`], maskUnit);

      gl.uniform1f(this.#locations[`u_opacity[${i}]`], layer.opacity ?? 1.0);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindVertexArray(null);
  }

  /**
   * Resize compositor resources.
   */
  resize(width, height) {
    this.#width = width;
    this.#height = height;
    const gl = this.#gl;

    // Recreate background texture
    gl.deleteTexture(this.#bgTexture);
    this.#bgTexture = createTexture(gl, width, height);

    // Clear mask textures (they'll be recreated on next update)
    for (const tex of this.#maskTextures.values()) {
      gl.deleteTexture(tex);
    }
    this.#maskTextures.clear();
  }
}
