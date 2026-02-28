/*{
  "DESCRIPTION": "Color Waves — undulating color bands",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 5.0 },
    { "NAME": "frequency", "TYPE": "float", "DEFAULT": 6.0, "MIN": 1.0, "MAX": 30.0 },
    { "NAME": "amplitude", "TYPE": "float", "DEFAULT": 0.3, "MIN": 0.0, "MAX": 1.0 },
    { "NAME": "hueShift", "TYPE": "float", "DEFAULT": 0.0, "MIN": 0.0, "MAX": 1.0 }
  ]
}*/

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = v_uv;
  float t = u_time * speed;

  float wave1 = sin(uv.y * frequency + t + sin(uv.x * 3.0 + t * 0.5) * amplitude * 5.0);
  float wave2 = sin(uv.x * frequency * 0.7 + t * 1.3 + cos(uv.y * 4.0 + t * 0.3) * amplitude * 3.0);
  float wave3 = sin((uv.x + uv.y) * frequency * 0.5 + t * 0.8);

  float combined = (wave1 + wave2 + wave3) / 3.0;

  float hue = fract(combined * 0.5 + 0.5 + hueShift + t * 0.05);
  float sat = 0.7 + 0.3 * sin(combined * PI);
  float val = 0.8 + 0.2 * combined;

  vec3 col = hsv2rgb(vec3(hue, sat, val));
  fragColor = vec4(col, 1.0);
}
