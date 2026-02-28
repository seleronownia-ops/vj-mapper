/*{
  "DESCRIPTION": "Geometric — rotating geometric patterns",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 0.5, "MIN": 0.0, "MAX": 3.0 },
    { "NAME": "segments", "TYPE": "float", "DEFAULT": 6.0, "MIN": 3.0, "MAX": 24.0 },
    { "NAME": "rings", "TYPE": "float", "DEFAULT": 5.0, "MIN": 1.0, "MAX": 20.0 },
    { "NAME": "glow", "TYPE": "float", "DEFAULT": 0.02, "MIN": 0.001, "MAX": 0.1 }
  ]
}*/

void main() {
  vec2 uv = v_uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float t = u_time * speed;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // Kaleidoscope fold
  float seg = TWO_PI / segments;
  a = mod(a, seg) - seg * 0.5;

  // Rotating rings
  float ring = sin(r * rings * PI - t * 2.0);
  float spoke = cos(a * segments * 0.5 + t);

  // Pattern
  float pattern = ring * spoke;

  // Glow lines
  float line1 = glow / abs(sin(r * rings * PI - t * 2.0));
  float line2 = glow / abs(cos(a * floor(segments) + t * 0.5));
  float lines = min(line1 + line2, 2.0);

  // Color
  vec3 col1 = vec3(0.1, 0.4, 0.9); // blue
  vec3 col2 = vec3(0.9, 0.2, 0.5); // pink
  vec3 col3 = vec3(0.1, 0.9, 0.6); // cyan

  vec3 col = mix(col1, col2, sin(r * 3.0 + t) * 0.5 + 0.5);
  col = mix(col, col3, sin(a * 2.0 + t * 0.7) * 0.5 + 0.5);
  col *= lines;

  // Fade at edges
  col *= smoothstep(1.5, 0.3, r);

  fragColor = vec4(col, 1.0);
}
