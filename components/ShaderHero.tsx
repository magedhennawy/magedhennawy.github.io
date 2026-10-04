import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/store';

// Hero background: one fragment shader on raw WebGL2 (no three.js). Pauses off-screen;
// renders a single frame with reduced motion.

const VERT = `#version 300 es
in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uLight;
uniform float uWide;
out vec4 o;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}
float contour(float k, float w){
  float fw = fwidth(k) * w;
  float f = fract(k);
  float d = min(f, 1.0 - f);
  return 1.0 - smoothstep(0.0, fw, d);
}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  float t = uTime * 0.035;

  vec2 q = vec2(fbm(uv*1.3 + t), fbm(uv*1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(uv*1.5 + 2.0*q + vec2(1.7, 9.2) + t*1.4), fbm(uv*1.5 + 2.0*q + vec2(8.3, 2.8)));
  float md = length(uv - uMouse);
  float h = fbm(uv*1.15 + 2.3*r) + 0.10*exp(-md*md*10.0);

  float minor = contour(h*22.0, 1.1);
  float major = contour(h*22.0/5.0, 1.6);

  // radar centre, right of the text on wide screens
  vec2 c = vec2(mix(0.0, 0.42*uRes.x/uRes.y, uWide), -0.04);
  vec2 rv = uv - c;
  float rad = length(rv);
  float ang = atan(rv.y, rv.x);
  float sweep = mod(uTime*0.45, 6.28318);
  float da = mod(sweep - ang, 6.28318);
  float wedge = exp(-da*2.2) * smoothstep(0.95, 0.2, rad);
  float rings = contour(rad*4.5, 1.0) * smoothstep(1.0, 0.15, rad) * 0.35;
  float cross = (1.0 - smoothstep(0.0, 0.0025, abs(rv.x))) + (1.0 - smoothstep(0.0, 0.0025, abs(rv.y)));
  cross *= smoothstep(0.9, 0.0, rad) * 0.12;

  float lines = minor*0.22 + major*0.55;
  lines *= 0.55 + 0.9*smoothstep(0.35, 0.8, h);
  lines += lines * wedge * 2.4;

  // fade out behind the text
  float calm = mix(1.0, smoothstep(-0.55, 0.35, uv.x), uWide * 0.85);
  float vig = smoothstep(1.25, 0.25, length(uv*vec2(0.8, 1.0)));

  vec3 accent = mix(vec3(0.369, 0.918, 0.831), vec3(0.059, 0.463, 0.431), uLight);
  vec3 sweepCol = mix(vec3(0.49, 0.83, 0.99), vec3(0.01, 0.41, 0.63), uLight);
  float a = (lines + rings + cross) * calm * vig;
  vec3 col = mix(accent, sweepCol, clamp(wedge, 0.0, 1.0));
  a += wedge * 0.06 * calm;
  a = clamp(a * mix(0.85, 1.25, uLight), 0.0, 1.0);
  o = vec4(col * a, a);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

export default function ShaderHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uLight = gl.getUniformLocation(prog, 'uLight');
    const uWide = gl.getUniformLocation(prog, 'uWide');

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = { x: 0.3, y: 0, tx: 0.3, ty: 0 };
    let visible = true;
    let raf = 0;
    let start = performance.now();
    let frozenAt = performance.now();

    const resize = () => {
      // render below native resolution
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.8;
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, prefersReducedMotion() ? 14 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uLight, document.documentElement.dataset.theme === 'light' ? 1 : 0);
      gl.uniform1f(uWide, canvas.clientWidth >= 900 ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !prefersReducedMotion() && !document.hidden) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const still = () => {
      resize();
      draw(performance.now());
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left - r.width / 2) / r.height;
      mouse.ty = -(e.clientY - r.top - r.height / 2) / r.height;
    };
    const onVis = () => {
      if (document.hidden) frozenAt = performance.now();
      else {
        start += performance.now() - frozenAt;
        kick();
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => (prefersReducedMotion() ? still() : resize()));
    ro.observe(canvas);
    const mo = new MutationObserver(() => still());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    reduced.addEventListener('change', kick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);

    still();
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      reduced.removeEventListener('change', kick);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      // no loseContext(): StrictMode re-runs the effect on the same canvas
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="no-print pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
