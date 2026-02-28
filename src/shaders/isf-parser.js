/**
 * ISF (Interactive Shader Format) parser.
 * ISF files have a JSON header wrapped in /*{ }* / followed by GLSL code.
 *
 * We convert ISF conventions to WebGL2 (GLSL 300 es) compatible code.
 */

/**
 * @typedef {Object} ISFInput
 * @property {string} NAME
 * @property {string} TYPE - 'float', 'bool', 'color', 'point2D', 'image'
 * @property {number|boolean|number[]} [DEFAULT]
 * @property {number} [MIN]
 * @property {number} [MAX]
 * @property {string} [LABEL]
 */

/**
 * @typedef {Object} ISFShader
 * @property {string} id - Unique identifier
 * @property {string} name - Display name
 * @property {string} description
 * @property {ISFInput[]} inputs
 * @property {string} glsl - Fragment shader source (WebGL2 ready)
 * @property {string} rawGlsl - Original ISF GLSL
 * @property {Object} metadata - Full ISF JSON header
 */

/**
 * Parse an ISF shader file (JSON header + GLSL body).
 * @param {string} source - Full ISF file content
 * @param {string} id - Shader identifier
 * @returns {ISFShader}
 */
export function parseISF(source, id) {
  // Extract JSON header: /*{ ... }*/
  const headerMatch = source.match(/\/\*\s*\{([\s\S]*?)\}\s*\*\//);

  let metadata = {};
  let rawGlsl = source;

  if (headerMatch) {
    try {
      metadata = JSON.parse(`{${headerMatch[1]}}`);
    } catch (e) {
      console.warn(`[isf] Failed to parse header for ${id}:`, e);
    }
    rawGlsl = source.slice(headerMatch.index + headerMatch[0].length).trim();
  }

  const inputs = (metadata.INPUTS || []).map(inp => ({
    NAME: inp.NAME,
    TYPE: inp.TYPE,
    DEFAULT: inp.DEFAULT,
    MIN: inp.MIN,
    MAX: inp.MAX,
    LABEL: inp.LABEL || inp.NAME,
  }));

  // Convert ISF GLSL to WebGL2 GLSL 300 es
  const glsl = convertToWebGL2(rawGlsl, inputs);

  return {
    id,
    name: metadata.DESCRIPTION?.split('\n')[0] || metadata.ISFVSN ? id : id,
    description: metadata.DESCRIPTION || '',
    inputs,
    glsl,
    rawGlsl,
    metadata,
  };
}

/**
 * Convert ISF GLSL to WebGL2 (GLSL 300 es).
 * Replaces ISF built-in variables with our uniforms.
 */
function convertToWebGL2(isfGlsl, inputs) {
  let glsl = isfGlsl;

  // ISF built-in variable mappings
  const replacements = [
    // ISF uses gl_FragCoord based isf_FragNormCoord
    [/isf_FragNormCoord/g, 'v_uv'],
    // TIME is a float uniform in ISF
    [/TIME/g, 'u_time'],
    // RENDERSIZE is vec2 in ISF
    [/RENDERSIZE/g, 'u_resolution'],
    // FRAMEINDEX
    [/FRAMEINDEX/g, 'u_frame'],
    // gl_FragColor → out color
    [/gl_FragColor/g, 'fragColor'],
    // texture2D → texture (GLSL 300 es)
    [/texture2D\s*\(/g, 'texture('],
    // IMG_NORM_PIXEL / IMG_PIXEL patterns
    [/IMG_NORM_PIXEL\s*\(\s*(\w+)\s*,/g, 'texture($1,'],
    [/IMG_PIXEL\s*\(\s*(\w+)\s*,/g, 'texture($1,'],
  ];

  for (const [pattern, replacement] of replacements) {
    glsl = glsl.replace(pattern, replacement);
  }

  // Build WebGL2 fragment shader
  const uniformDecls = inputs.map(inp => {
    switch (inp.TYPE) {
      case 'float': return `uniform float ${inp.NAME};`;
      case 'bool': return `uniform bool ${inp.NAME};`;
      case 'color': return `uniform vec4 ${inp.NAME};`;
      case 'point2D': return `uniform vec2 ${inp.NAME};`;
      case 'image': return `uniform sampler2D ${inp.NAME};`;
      default: return `uniform float ${inp.NAME};`;
    }
  }).join('\n');

  const header = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform int u_frame;
uniform vec2 u_mouse;

${uniformDecls}

#define PI 3.14159265359
#define TWO_PI 6.28318530718
`;

  // Check if source already has a main function
  if (glsl.includes('void main')) {
    return header + '\n' + glsl;
  }

  // Wrap in main if needed
  return header + '\nvoid main() {\n' + glsl + '\n}';
}

/**
 * Get default uniform values for an ISF shader.
 * @param {ISFShader} shader
 * @returns {Object<string, number|boolean|number[]>}
 */
export function getDefaultUniforms(shader) {
  const uniforms = {};
  for (const inp of shader.inputs) {
    if (inp.DEFAULT !== undefined) {
      uniforms[inp.NAME] = inp.DEFAULT;
    } else {
      switch (inp.TYPE) {
        case 'float': uniforms[inp.NAME] = 0.5; break;
        case 'bool': uniforms[inp.NAME] = false; break;
        case 'color': uniforms[inp.NAME] = [1, 1, 1, 1]; break;
        case 'point2D': uniforms[inp.NAME] = [0.5, 0.5]; break;
        default: uniforms[inp.NAME] = 0;
      }
    }
  }
  return uniforms;
}
