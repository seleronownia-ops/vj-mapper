/*{
  "DESCRIPTION": "Plasma — classic VJ plasma effect",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 5.0 },
    { "NAME": "scale", "TYPE": "float", "DEFAULT": 3.0, "MIN": 0.5, "MAX": 20.0 },
    { "NAME": "complexity", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 3.0 }
  ]
}*/

void main() {
  vec2 uv = v_uv * scale;
  float t = u_time * speed;

  float v1 = sin(uv.x * 2.0 + t);
  float v2 = sin(uv.y * 2.0 + t * 0.7);
  float v3 = sin((uv.x + uv.y) * complexity + t * 1.3);
  float v4 = sin(length(uv - vec2(0.5 * scale)) * 2.0 * complexity - t);

  float v = (v1 + v2 + v3 + v4) * 0.25;

  vec3 col;
  col.r = sin(v * PI + t * 0.3) * 0.5 + 0.5;
  col.g = sin(v * PI + t * 0.5 + TWO_PI / 3.0) * 0.5 + 0.5;
  col.b = sin(v * PI + t * 0.7 + TWO_PI * 2.0 / 3.0) * 0.5 + 0.5;

  fragColor = vec4(col, 1.0);
}
