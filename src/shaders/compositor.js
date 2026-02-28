/**
 * Compositor — blends shader outputs using segment masks.
 * Uses a multi-pass approach: one draw call per layer to avoid
 * dynamic sampler indexing (not allowed in WebGL2).
 */
import { createProgram, createFullscreenQuad, createTexture, createFramebuffer, FULLSCREEN_VERT } from '../utils/webgl.js';

const LAYER_FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_base;      // previous composite
uniform sampler2D u_layer;     // shader output
uniform sampler2D u_mask;      // segment mask
uniform float u_opacity;

void main() {
  vec4 base = texture(u_base, v_uv);
  vec4 layer = texture(u_layer, v_uv);
  float maskVal = texture(u_mask, v_uv).r;
  float alpha = maskVal * u_opacity;
  fragColor = vec4(mix(base.rgb, layer.rgb, alpha), 1.0);
}`;

const PASSTHROUGH_FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_tex;

void main() {
  fragColor = texture(u_tex, v_uv);
}`;

export class Compositor {
  /** @type {WebGL2RenderingContext} */
  #gl;

  /** @type {WebGLProgram} */
  #layerProgram;

  /** @type {WebGLProgram} */
  #passProgram;

  /** @type {WebGLVertexArrayObject} */
  #quad;

  /** @type {Map<number, WebGLTexture>} */
  #maskTextures = new Map();

  #width;
  #height;

  /** @type {WebGLTexture} */
  #bgTexture;

  /** Ping-pong framebuffers for multi-pass compositing */
  #pingFbo;
  #pongFbo;

  #layerLocs = {};
  #passLocs = {};

  constructor(gl, width, height) {
    this.#gl = gl;
    this.#width = width;
    this.#height = height;
    this.#quad = createFullscreenQuad(gl);

    this.#layerProgram = createProgram(gl, FULLSCREEN_VERT, LAYER_FRAG);
    this.#passProgram = createProgram(gl, FULLSCREEN_VERT, PASSTHROUGH_FRAG);

    this.#bgTexture = createTexture(gl, width, height);
    this.#pingFbo = createFramebuffer(gl, width, height);
    this.#pongFbo = createFramebuffer(gl, width, height);

    // Cache locations
    const lp = this.#layerProgram;
    this.#layerLocs = {
      u_base: gl.getUniformLocation(lp, 'u_base'),
      u_layer: gl.getUniformLocation(lp, 'u_layer'),
      u_mask: gl.getUniformLocation(lp, 'u_mask'),
      u_opacity: gl.getUniformLocation(lp, 'u_opacity'),
    };

    this.#passLocs = {
      u_tex: gl.getUniformLocation(this.#passProgram, 'u_tex'),
    };
  }

  updateBackground(source) {
    const gl = this.#gl;
    gl.bindTexture(gl.TEXTURE_2D, this.#bgTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  }

  updateMask(segmentId, mask, width, height) {
    const gl = this.#gl;
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
   * Composite layers using multi-pass ping-pong approach.
   * Each layer = one draw call with fixed sampler bindings (no dynamic indexing).
   */
  composite(layers, opts = {}) {
    const gl = this.#gl;
    const { showBackground = true } = opts;

    gl.bindVertexArray(this.#quad);

    // Pass 0: draw background into ping buffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.#pingFbo.framebuffer);
    gl.viewport(0, 0, this.#width, this.#height);
    gl.useProgram(this.#passProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.#bgTexture);
    gl.uniform1i(this.#passLocs.u_tex, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!showBackground) {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    // Each layer pass: read from ping, write to pong, then swap
    let readFbo = this.#pingFbo;
    let writeFbo = this.#pongFbo;

    gl.useProgram(this.#layerProgram);

    for (const layer of layers) {
      const maskTex = this.#maskTextures.get(layer.segmentId);
      if (!maskTex) continue;

      gl.bindFramebuffer(gl.FRAMEBUFFER, writeFbo.framebuffer);
      gl.viewport(0, 0, this.#width, this.#height);

      // Bind base (previous composite)
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, readFbo.texture);
      gl.uniform1i(this.#layerLocs.u_base, 0);

      // Bind shader layer
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, layer.shaderTexture);
      gl.uniform1i(this.#layerLocs.u_layer, 1);

      // Bind mask
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, maskTex);
      gl.uniform1i(this.#layerLocs.u_mask, 2);

      gl.uniform1f(this.#layerLocs.u_opacity, layer.opacity ?? 1.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Swap ping-pong
      const tmp = readFbo;
      readFbo = writeFbo;
      writeFbo = tmp;
    }

    // Final pass: draw result to screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.#width, this.#height);
    gl.useProgram(this.#passProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, readFbo.texture);
    gl.uniform1i(this.#passLocs.u_tex, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.bindVertexArray(null);
  }

  resize(width, height) {
    this.#width = width;
    this.#height = height;
    const gl = this.#gl;

    gl.deleteTexture(this.#bgTexture);
    this.#bgTexture = createTexture(gl, width, height);

    gl.deleteFramebuffer(this.#pingFbo.framebuffer);
    gl.deleteTexture(this.#pingFbo.texture);
    gl.deleteFramebuffer(this.#pongFbo.framebuffer);
    gl.deleteTexture(this.#pongFbo.texture);
    this.#pingFbo = createFramebuffer(gl, width, height);
    this.#pongFbo = createFramebuffer(gl, width, height);

    for (const tex of this.#maskTextures.values()) gl.deleteTexture(tex);
    this.#maskTextures.clear();
  }
}
