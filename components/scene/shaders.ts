
export const glowVert = /* glsl */ `
attribute float aSize;
attribute vec3 aColor;
attribute float aAlpha;
uniform float uScale;
uniform float uTime;
uniform float uTwinkle;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 1.0;
  if (uTwinkle > 0.0) {
    float ph = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453) * 6.2831;
    tw = 0.55 + 0.45 * sin(uTime * (0.6 + ph * 0.25) + ph);
  }
  gl_PointSize = clamp(aSize * uScale / -mv.z, 1.0, 220.0);
  vColor = aColor;
  vAlpha = aAlpha * tw;
}
`;

export const glowFrag = /* glsl */ `
uniform float uLight;
uniform float uHalo;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  if (d > 1.0) discard;
  float core = smoothstep(0.24, 0.12, d);
  float halo = pow(1.0 - d, 2.6) * uHalo;
  float a = (core + halo) * vAlpha;
  vec3 col = mix(vColor, vec3(1.0), core * 0.55 * (1.0 - uLight));
  gl_FragColor = vec4(col, a);
}
`;

export const fresnelVert = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
varying vec3 vLocal;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vN = normalize(mat3(modelMatrix) * normal);
  vV = normalize(cameraPosition - wp.xyz);
  vLocal = normalize(position);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const fresnelFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uIntensity;
uniform float uTime;
uniform float uLight;
varying vec3 vN;
varying vec3 vV;
varying vec3 vLocal;
void main() {
  float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.4);
  float bands = smoothstep(0.92, 1.0, sin(vLocal.y * 34.0 - uTime * 1.2) * 0.5 + 0.5) * 0.22;
  float a = f * uIntensity + bands * (0.4 + f) + 0.05;
  vec3 col = uColor * (0.55 + f * 0.9);
  if (uLight > 0.5) { col = uColor * (0.85 + 0.3 * f); a = f * uIntensity * 0.55 + bands * 0.25 + 0.02; }
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

export const towerVert = /* glsl */ `
attribute float aLit;
varying vec2 vUv;
varying vec3 vColor;
varying float vH;
varying float vLit;
varying vec3 vWorld;
void main() {
  vUv = uv;
  #ifdef USE_INSTANCING_COLOR
    vColor = instanceColor;
  #else
    vColor = vec3(1.0);
  #endif
  vH = position.y;
  vLit = aLit;
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const towerFrag = /* glsl */ `
uniform float uMorph;
uniform float uLight;
uniform float uTime;
varying vec2 vUv;
varying vec3 vColor;
varying float vH;
varying float vLit;
varying vec3 vWorld;
void main() {
  float e = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float edge = 1.0 - smoothstep(0.0, fwidth(e) * 1.6, e);
  float fy = vWorld.y * 3.0;
  float floors = 1.0 - smoothstep(0.0, fwidth(fy) * 1.2, abs(fract(fy) - 0.5) - 0.42);
  float scan = smoothstep(0.985, 1.0, sin(vWorld.y * 1.4 - uTime * 2.0) * 0.5 + 0.5);
  float fill = 0.08 + vH * 0.14;
  float lit = 0.35 + 0.65 * vLit;
  float a = (edge * 0.85 + fill + floors * 0.06 + scan * 0.35) * lit * uMorph;
  vec3 col = vColor * (0.7 + 0.6 * edge);
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

export const radarVert = /* glsl */ `
varying vec2 vP;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vP = wp.xz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const radarFrag = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uLight;
uniform float uSweep;
uniform vec3 uColor;
varying vec2 vP;
float line(float k, float w) {
  float fw = fwidth(k) * w;
  float f = fract(k);
  return 1.0 - smoothstep(0.0, fw, min(f, 1.0 - f));
}
void main() {
  float r = length(vP);
  float ang = atan(vP.y, vP.x);
  float rings = line(r / 4.0, 1.2);
  float grid = line(vP.x / 1.35, 1.0) + line(vP.y / 1.35, 1.0);
  float spokes = line(ang / 6.28318 * 12.0, 1.0) * smoothstep(3.0, 6.0, r);
  float da = mod(uTime * 0.5 - ang, 6.28318);
  float wedge = exp(-da * 2.5) * uSweep;
  float fade = smoothstep(27.0, 5.0, r) * smoothstep(0.0, 1.5, r);
  float a = rings * 0.22 + spokes * 0.05 + grid * (0.015 + 0.12 * uMorph) + wedge * (0.10 + rings * 0.5);
  a *= fade * (uLight > 0.5 ? 0.9 : 1.0);
  gl_FragColor = vec4(uColor, a);
}
`;

export const pathVert = /* glsl */ `
attribute float aD;
varying float vD;
void main() {
  vD = aD;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const pathFrag = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
varying float vD;
void main() {
  float k = fract(vD * 70.0 - uTime * 0.5);
  float dash = step(0.45, k);
  float head = smoothstep(0.0, 0.06, vD) * smoothstep(1.0, 0.92, vD);
  gl_FragColor = vec4(uColor, (0.10 + 0.6 * dash) * head * uOpacity);
}
`;
