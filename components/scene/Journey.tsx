import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { eras, ventures } from '@/data/profile';
import { eraPositions, flightPath, venturePositions, ventureSize } from '@/lib/layout';
import type { Palette } from '@/lib/palette';
import { live } from '@/lib/store';
import { pathFrag, pathVert } from './shaders';
import { blendFor, litOf, nodePos, pointerHandlers, S, useDispose } from './state';
import { makeGlowGeometry, useGlowMaterial } from './glow';
import { useFresnel } from './Platform';

const PAST = eras.filter((e) => ['ibm', 'rbc', 'clarify'].includes(e.id));

export function FlightPath({ pal, light }: { pal: Palette; light: boolean }) {
  const { mat, line, geo } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(flightPath.map((p) => new THREE.Vector3(...p)), false, 'centripetal');
    const pts = curve.getSpacedPoints(400);
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    g.setAttribute('aD', new THREE.BufferAttribute(new Float32Array(pts.map((_, i) => i / (pts.length - 1))), 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: pathVert,
      fragmentShader: pathFrag,
      transparent: true,
      depthWrite: false,
      blending: blendFor(light),
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(pal.hud) }, uOpacity: { value: 1 } },
    });
    const line = new THREE.Line(g, m);
    line.raycast = () => null;
    return { mat: m, line, geo: g };
  }, [pal.hud, light]);
  useDispose(mat, geo);
  useFrame(() => {
    mat.uniforms.uTime.value = live.reducedMotion ? 0 : S.time;
    mat.uniforms.uOpacity.value = 0.6 + 0.4 * Math.max(litOf('ibm'), litOf('rbc'), litOf('clarify'));
  });
  return <primitive object={line} />;
}

const ERA_COLOR = { ibm: 'frontend', rbc: 'ai', clarify: 'backend' } as const;

export function EraBeacons({ pal, light }: { pal: Palette; light: boolean }) {
  useMemo(() => {
    for (const e of eras) nodePos(e.id).set(...eraPositions[e.id]);
  }, []);
  return (
    <group>
      {PAST.map((e, i) => (
        <EraStation key={e.id} id={e.id} index={i} color={pal.category[ERA_COLOR[e.id as keyof typeof ERA_COLOR]]} hud={pal.hud} light={light} />
      ))}
    </group>
  );
}

const octagon = (() => {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
})();
const ticks = (() => {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const r0 = i % 6 === 0 ? 1.55 : 1.68;
    pts.push(new THREE.Vector3(Math.cos(a) * r0, Math.sin(a) * r0, 0), new THREE.Vector3(Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
})();
const crystal = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.85, 0));
const drop = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1.9, 0), new THREE.Vector3(0, -10, 0)]);

function EraStation({ id, index, color, hud, light }: { id: string; index: number; color: string; hud: string; light: boolean }) {
  const shell = useFresnel(color, light, 1.6);
  const glowMat = useGlowMaterial(light, { halo: 0.9 });
  const glowGeo = useMemo(() => {
    const g = makeGlowGeometry(1);
    const c = new THREE.Color(color);
    (g.attributes.aColor.array as Float32Array).set([c.r, c.g, c.b]);
    return g;
  }, [color]);
  const reticle = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.LineSegments>(null);
  const handlers = useMemo(() => pointerHandlers(() => id), [id]);

  useFrame(({ camera }, dt) => {
    const lit = litOf(id);
    const still = live.reducedMotion;
    shell.uniforms.uTime.value = S.time;
    shell.uniforms.uIntensity.value = 1.2 + lit * 1.2;
    (glowGeo.attributes.aSize.array as Float32Array)[0] = 5 + lit * 4;
    (glowGeo.attributes.aAlpha.array as Float32Array)[0] = 0.35 + lit * 0.5;
    glowGeo.attributes.aSize.needsUpdate = true;
    glowGeo.attributes.aAlpha.needsUpdate = true;
    if (reticle.current) {
      reticle.current.quaternion.copy(camera.quaternion);
      reticle.current.scale.setScalar(1 + lit * 0.25);
    }
    if (spinner.current && !still) spinner.current.rotation.z += dt * (0.15 + index * 0.05);
    if (crystalRef.current && !still) {
      crystalRef.current.rotation.y += dt * 0.4;
      crystalRef.current.rotation.x = Math.sin(S.time * 0.5 + index) * 0.3;
    }
  });

  return (
    <group position={eraPositions[id]}>
      <points geometry={glowGeo} material={glowMat} raycast={() => null} />
      <mesh material={shell} {...handlers}>
        <sphereGeometry args={[0.55, 24, 16]} />
      </mesh>
      <lineSegments ref={crystalRef} geometry={crystal} raycast={() => null}>
        <lineBasicMaterial color={color} transparent opacity={0.8} depthWrite={false} />
      </lineSegments>
      <group ref={reticle}>
        <group ref={spinner}>
          <lineLoop geometry={octagon} scale={1.35} raycast={() => null}>
            <lineBasicMaterial color={hud} transparent opacity={0.6} depthWrite={false} />
          </lineLoop>
        </group>
        <lineSegments geometry={ticks} raycast={() => null}>
          <lineBasicMaterial color={hud} transparent opacity={0.35} depthWrite={false} />
        </lineSegments>
      </group>
      <lineSegments geometry={drop} raycast={() => null}>
        <lineBasicMaterial color={hud} transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export function Ventures({ pal, light }: { pal: Palette; light: boolean }) {
  return (
    <group>
      {ventures.map((v, i) => (
        <VentureSystem key={v.id} id={v.id} index={i} pal={pal} light={light} />
      ))}
    </group>
  );
}

function VentureSystem({ id, index, pal, light }: { id: string; index: number; pal: Palette; light: boolean }) {
  const color = index === 0 ? pal.venture : index === 1 ? pal.category.ai : pal.category.cloud;
  const mat = useFresnel(color, light, 1.5);
  const moons = useRef<THREE.Group>(null);
  const pos = venturePositions[id];
  const r = ventureSize[id];
  const handlers = useMemo(() => pointerHandlers(() => id), [id]);
  useMemo(() => nodePos(id).set(...pos), [id, pos]);

  useFrame((_, dt) => {
    mat.uniforms.uTime.value = S.time;
    mat.uniforms.uIntensity.value = 1.2 + litOf(id) * 1.0;
    if (moons.current && !live.reducedMotion) moons.current.rotation.y += dt * (0.4 + index * 0.15);
  });

  return (
    <group position={pos}>
      <mesh material={mat} {...handlers}>
        <sphereGeometry args={[r, 32, 24]} />
      </mesh>
      <group ref={moons} rotation={[0.4 + index * 0.3, 0, 0.2]}>
        {Array.from({ length: index === 0 ? 3 : 1 + index }, (_, k) => (
          <mesh key={k} position={[Math.cos(k * 2.1) * (r * 2 + k * 0.5), 0, Math.sin(k * 2.1) * (r * 2 + k * 0.5)]}>
            <sphereGeometry args={[0.12, 10, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r * 2 - 0.01, r * 2 + 0.01, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
