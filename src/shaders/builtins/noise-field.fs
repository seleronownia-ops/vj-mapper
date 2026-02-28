/*{
  "DESCRIPTION": "Noise Field — flowing simplex noise",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 0.5, "MIN": 0.0, "MAX": 3.0 },
    { "NAME": "scale", "TYPE": "float", "DEFAULT": 4.0, "MIN": 0.5, "MAX": 20.0 },
    { "NAME": "octaves", "TYPE": "float", "DEFAULT": 3.0, "MIN": 1.0, "MAX": 6.0 },
    { "NAME": "brightness", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 2.0 }
  ]
}*/

// Simplex-like noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p, float oct) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (float i = 0.0; i < 6.0; i++) {
    if (i >= oct) break;
    val += amp * snoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

void main() {
  vec2 uv = v_uv * scale;
  float t = u_time * speed;

  float n = fbm(uv + vec2(t * 0.3, t * 0.2), octaves);
  float n2 = fbm(uv + vec2(n * 0.5, t * 0.1), octaves);

  vec3 col;
  col.r = n * 0.5 + 0.5;
  col.g = n2 * 0.4 + 0.4;
  col.b = (n + n2) * 0.3 + 0.6;
  col *= brightness;

  fragColor = vec4(col, 1.0);
}
