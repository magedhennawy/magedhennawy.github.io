import { useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { GROUND_Y, keyframes } from '@/lib/layout';
import type { Palette } from '@/lib/palette';
import { live, sectionAt, store } from '@/lib/store';
import { makeGlowGeometry, useGlowMaterial } from './glow';
import { EraBeacons, FlightPath, Ventures } from './Journey';
import { Labels } from './Labels';
import { Core, Satellites } from './Platform';
import { radarFrag, radarVert } from './shaders';
import { Skills } from './Skills';
import { S, blendFor, tickHighlights, useDispose, useSceneTheme } from './state';

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

// must run first each frame
function Director() {
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    if (!live.reducedMotion) S.time += d;
    tickHighlights(d);
  });
  return null;
}

const FOCUS_DIST = { skill: 5, app: 4.5, era: 8, venture: 7, core: 9 } as const;

function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const v = useMemo(
    () => ({
      pos: new THREE.Vector3(),
      tgt: new THREE.Vector3(),
      look: new THREE.Vector3(...keyframes.hero.target),
      dir: new THREE.Vector3(),
      tmp: new THREE.Vector3(),
      shift: 0,
      appliedShift: -1,
      sizeKey: 0,
      morphTarget: 0,
    }),
    [],
  );

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1);
    const { a, b, k } = sectionAt(live.scrollT);
    const A = keyframes[a] ?? keyframes.hero;
    const B = keyframes[b] ?? A;
    const e = smooth(clamp01(k));
    v.pos.set(...A.pos).lerp(v.tmp.set(...B.pos), e);
    v.tgt.set(...A.target).lerp(v.tmp.set(...B.target), e);
    v.morphTarget = A.morph + (B.morph - A.morph) * e;
    let shift = A.shift + (B.shift - A.shift) * e;

    const focus = store.get().focus;
    const fp = focus ? S.pos.get(focus.id) : undefined;
    if (focus && fp) {
      v.dir.copy(camera.position).sub(fp);
      if (v.dir.lengthSq() < 1e-4) v.dir.set(0, 0.3, 1);
      v.dir.normalize();
      v.tgt.copy(fp);
      // city view: back off and look down
      if (focus.kind === 'skill' && S.morph > 0.5) v.dir.lerp(v.tmp.set(0, 0.8, 0.6), 0.6).normalize();
      v.pos.copy(fp).addScaledVector(v.dir, FOCUS_DIST[focus.kind] * (focus.kind === 'skill' ? 1 + S.morph * 1.2 : 1));
      shift *= 0.6;
    }

    // pull back on portrait screens
    const aspect = size.width / Math.max(1, size.height);
    if (aspect < 1 && !focus) v.pos.sub(v.tgt).multiplyScalar(1 + (1 - aspect) * 0.9).add(v.tgt);

    if (!live.reducedMotion && !live.coarse) {
      v.pos.x += live.pointer.x * 1.4;
      v.pos.y += live.pointer.y * 0.9;
    }

    const rate = live.reducedMotion ? 1 - Math.exp(-dt * 12) : 1 - Math.exp(-dt * 2.6);
    camera.position.lerp(v.pos, rate);
    v.look.lerp(v.tgt, rate);
    camera.lookAt(v.look);
    S.morph += (v.morphTarget - S.morph) * (live.reducedMotion ? 1 : 1 - Math.exp(-dt * 2.2));

    // shift the subject right of the ~600px text column
    const wide = size.width >= 900 ? 1 : 0;
    v.shift += (shift * wide - v.shift) * rate;
    const sizeKey = size.width * 10000 + size.height;
    if (Math.abs(v.shift - v.appliedShift) > 0.002 || sizeKey !== v.sizeKey) {
      v.appliedShift = v.shift;
      v.sizeKey = sizeKey;
      const px = -v.shift * Math.min(320, size.width * 0.3);
      camera.setViewOffset(size.width, size.height, px, 0, size.width, size.height);
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

function Starfield({ pal, light, low }: { pal: Palette; light: boolean; low: boolean }) {
  const count = live.coarse || low ? 700 : 1600;
  const mat = useGlowMaterial(light, { halo: 0.25, twinkle: true });
  const geo = useMemo(() => {
    const g = makeGlowGeometry(count);
    const p = g.attributes.position.array as Float32Array;
    const c = g.attributes.aColor.array as Float32Array;
    const s = g.attributes.aSize.array as Float32Array;
    const a = g.attributes.aAlpha.array as Float32Array;
    const base = new THREE.Color(pal.star);
    const warm = new THREE.Color(pal.category.ai);
    const tmp = new THREE.Color();
    let seed = 42;
    const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const rad = 90 + r() * 110;
      const q = Math.sqrt(1 - u * u);
      p.set([Math.cos(th) * q * rad, u * rad * 0.6, Math.sin(th) * q * rad], i * 3);
      tmp.copy(base).lerp(warm, r() < 0.08 ? 0.6 : 0);
      c.set([tmp.r, tmp.g, tmp.b], i * 3);
      s[i] = 0.5 + Math.pow(r(), 3) * 2.2;
      a[i] = light ? 0.35 : 0.5 + r() * 0.5;
    }
    return g;
  }, [count, pal.star, pal.category.ai, light]);
  useDispose(geo);
  return <points geometry={geo} material={mat} raycast={() => null} />;
}

function Radar({ pal, light }: { pal: Palette; light: boolean }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: radarVert,
        fragmentShader: radarFrag,
        transparent: true,
        depthWrite: false,
        blending: blendFor(light),
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uLight: { value: light ? 1 : 0 },
          uSweep: { value: 1 },
          uColor: { value: new THREE.Color(pal.hud) },
        },
      }),
    [light, pal.hud],
  );
  useDispose(mat);
  useFrame(() => {
    mat.uniforms.uTime.value = S.time;
    mat.uniforms.uMorph.value = S.morph;
    mat.uniforms.uSweep.value = live.reducedMotion ? 0 : 1;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y, 0]} material={mat} raycast={() => null}>
      <planeGeometry args={[60, 60]} />
    </mesh>
  );
}

function World({ low }: { low: boolean }) {
  const { light, pal } = useSceneTheme();
  return (
    <>
      <Director />
      <Starfield pal={pal} light={light} low={low} />
      <Radar pal={pal} light={light} />
      <Core pal={pal} light={light} />
      <Satellites pal={pal} light={light} />
      <FlightPath pal={pal} light={light} />
      <EraBeacons pal={pal} light={light} />
      <Ventures pal={pal} light={light} />
      <Skills pal={pal} light={light} />
      <Labels />
      <CameraRig />
    </>
  );
}

export default function Experience() {
  const maxDpr = live.coarse ? 1.5 : 1.75;
  const [dpr, setDpr] = useState(Math.min(maxDpr, typeof window !== 'undefined' ? window.devicePixelRatio : 1));
  const [low, setLow] = useState(false);
  const hero = keyframes.hero;

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: !live.coarse, alpha: true, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 50, near: 0.1, far: 500, position: hero.pos }}
      raycaster={{ params: { Points: { threshold: 0.45 }, Line: { threshold: 0.1 } } as THREE.RaycasterParameters }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        store.setSceneReady(true);
      }}
      onPointerMissed={() => store.setFocus(null)}
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => {
          live.quality = 'low';
          setLow(true);
          setDpr((d) => Math.max(1, d - 0.25));
        }}
        onIncline={() => setDpr((d) => Math.min(maxDpr, d + 0.25))}
        onFallback={() => setDpr(1)}
      />
      <World low={low} />
    </Canvas>
  );
}
