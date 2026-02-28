/**
 * WebGL2 shader pipeline.
 * Manages multiple ISF shaders, each rendering to its own framebuffer.
 * The compositor then composites them using segment masks.
 */
import { createProgram, createFullscreenQuad, createFramebuffer, FULLSCREEN_VERT } from '../utils/webgl.js';
import { parseISF, getDefaultUniforms } from './isf-parser.js';

// Built-in shader sources (imported as strings via Vite ?raw)
import plasmaSource from './builtins/plasma.fs?raw';
import noiseFieldSource from './builtins/noise-field.fs?raw';
import colorWavesSource from './builtins/color-waves.fs?raw';
import geometricSource from './builtins/geometric.fs?raw';

/**
 * @typedef {Object} ShaderInstance
 * @property {string} id
 * @property {import('./isf-parser.js').ISFShader} isf
 * @property {WebGLProgram} program
 * @property {Object} uniforms - Current uniform values
 * @property {{ framebuffer: WebGLFramebuffer, texture: WebGLTexture }} fbo
 * @property {Object<string, WebGLUniformLocation>} locations - Cached uniform locations
 */

export class ShaderPipeline {
  /** @type {WebGL2RenderingContext} */
  #gl;

  /** @type {WebGLVertexArrayObject} */
  #quad;

  /** @type {Map<string, ShaderInstance>} */
  #shaders = new Map();

  /** @type {number} */
  #width;

  /** @type {number} */
  #height;

  /** @type {number} */
  #frame = 0;

  /** @type {number} */
  #startTime;

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
    this.#startTime = performance.now() / 1000;

    this.#loadBuiltins();
  }

  /** Load built-in ISF shaders */
  #loadBuiltins() {
    const builtins = [
      ['plasma', plasmaSource],
      ['noise-field', noiseFieldSource],
      ['color-waves', colorWavesSource],
      ['geometric', geometricSource],
    ];

    for (const [id, source] of builtins) {
      this.addShader(id, source);
    }
  }

  /**
   * Add a shader from ISF source.
   * @param {string} id
   * @param {string} isfSource
   * @returns {import('./isf-parser.js').ISFShader}
   */
  addShader(id, isfSource) {
    const gl = this.#gl;
    const isf = parseISF(isfSource, id);

    let program;
    try {
      program = createProgram(gl, FULLSCREEN_VERT, isf.glsl);
    } catch (err) {
      console.error(`[pipeline] Shader ${id} compile failed:`, err.message);
      return null;
    }

    const fbo = createFramebuffer(gl, this.#width, this.#height);
    const uniforms = getDefaultUniforms(isf);

    // Cache uniform locations
    const locations = {};
    const allUniforms = ['u_time', 'u_resolution', 'u_frame', 'u_mouse', ...isf.inputs.map(i => i.NAME)];
    for (const name of allUniforms) {
      locations[name] = gl.getUniformLocation(program, name);
    }

    this.#shaders.set(id, { id, isf, program, uniforms, fbo, locations });
    return isf;
  }

  /**
   * Render all active shaders to their framebuffers.
   * @param {number[]} [mousePos=[0,0]]
   */
  render(mousePos = [0, 0]) {
    const gl = this.#gl;
    const time = performance.now() / 1000 - this.#startTime;
    this.#frame++;

    gl.bindVertexArray(this.#quad);

    for (const shader of this.#shaders.values()) {
      // Render to framebuffer
      gl.bindFramebuffer(gl.FRAMEBUFFER, shader.fbo.framebuffer);
      gl.viewport(0, 0, this.#width, this.#height);
      gl.useProgram(shader.program);

      // Set built-in uniforms
      const loc = shader.locations;
      if (loc.u_time != null) gl.uniform1f(loc.u_time, time);
      if (loc.u_resolution != null) gl.uniform2f(loc.u_resolution, this.#width, this.#height);
      if (loc.u_frame != null) gl.uniform1i(loc.u_frame, this.#frame);
      if (loc.u_mouse != null) gl.uniform2f(loc.u_mouse, mousePos[0], mousePos[1]);

      // Set ISF input uniforms
      for (const input of shader.isf.inputs) {
        const uloc = loc[input.NAME];
        if (uloc == null) continue;
        const val = shader.uniforms[input.NAME];

        switch (input.TYPE) {
          case 'float': gl.uniform1f(uloc, val); break;
          case 'bool': gl.uniform1i(uloc, val ? 1 : 0); break;
          case 'color': gl.uniform4fv(uloc, val); break;
          case 'point2D': gl.uniform2fv(uloc, val); break;
        }
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindVertexArray(null);
  }

  /**
   * Get the rendered texture for a shader.
   * @param {string} id
   * @returns {WebGLTexture|null}
   */
  getTexture(id) {
    return this.#shaders.get(id)?.fbo.texture ?? null;
  }

  /**
   * Set a uniform value for a shader.
   * @param {string} shaderId
   * @param {string} uniformName
   * @param {*} value
   */
  setUniform(shaderId, uniformName, value) {
    const shader = this.#shaders.get(shaderId);
    if (shader) shader.uniforms[uniformName] = value;
  }

  /**
   * Get all loaded shaders info.
   * @returns {Array<{ id: string, name: string, inputs: ISFInput[] }>}
   */
  getShaderList() {
    return [...this.#shaders.values()].map(s => ({
      id: s.id,
      name: s.isf.name || s.id,
      description: s.isf.description,
      inputs: s.isf.inputs,
    }));
  }

  /**
   * Resize all framebuffers.
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this.#width = width;
    this.#height = height;
    const gl = this.#gl;

    for (const shader of this.#shaders.values()) {
      // Recreate FBO at new size
      gl.deleteFramebuffer(shader.fbo.framebuffer);
      gl.deleteTexture(shader.fbo.texture);
      shader.fbo = createFramebuffer(gl, width, height);
    }
  }
}
