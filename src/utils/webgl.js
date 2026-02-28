/**
 * WebGL2 utility functions.
 */

/**
 * Create and compile a shader.
 * @param {WebGL2RenderingContext} gl
 * @param {number} type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @param {string} source
 * @returns {WebGLShader}
 */
export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

/**
 * Create a program from vertex and fragment shader sources.
 * @param {WebGL2RenderingContext} gl
 * @param {string} vertSrc
 * @param {string} fragSrc
 * @returns {WebGLProgram}
 */
export function createProgram(gl, vertSrc, fragSrc) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }

  // Clean up shaders (attached to program, no longer needed separately)
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  return program;
}

/**
 * Create a fullscreen quad VAO (two triangles covering [-1,1]).
 * @param {WebGL2RenderingContext} gl
 * @returns {WebGLVertexArrayObject}
 */
export function createFullscreenQuad(gl) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const vertices = new Float32Array([
    -1, -1,  0, 0,
     1, -1,  1, 0,
    -1,  1,  0, 1,
     1,  1,  1, 1,
  ]);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // position: vec2
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);

  // texcoord: vec2
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);

  gl.bindVertexArray(null);
  return vao;
}

/**
 * Create a texture from ImageData or typed array.
 * @param {WebGL2RenderingContext} gl
 * @param {number} width
 * @param {number} height
 * @param {Uint8Array|Float32Array|null} data
 * @param {Object} [opts]
 * @param {number} [opts.internalFormat=gl.RGBA8]
 * @param {number} [opts.format=gl.RGBA]
 * @param {number} [opts.type=gl.UNSIGNED_BYTE]
 * @returns {WebGLTexture}
 */
export function createTexture(gl, width, height, data = null, opts = {}) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);

  const internalFormat = opts.internalFormat ?? gl.RGBA8;
  const format = opts.format ?? gl.RGBA;
  const type = opts.type ?? gl.UNSIGNED_BYTE;

  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return tex;
}

/**
 * Create a framebuffer with a color texture attachment.
 * @param {WebGL2RenderingContext} gl
 * @param {number} width
 * @param {number} height
 * @returns {{ framebuffer: WebGLFramebuffer, texture: WebGLTexture }}
 */
export function createFramebuffer(gl, width, height) {
  const texture = createTexture(gl, width, height);
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    throw new Error(`Framebuffer incomplete: ${status}`);
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { framebuffer: fb, texture };
}

/** Standard fullscreen vertex shader (flips Y for correct orientation) */
export const FULLSCREEN_VERT = `#version 300 es
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
