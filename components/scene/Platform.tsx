import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { apps } from '@/data/profile';
import { orbitPosition, orbits, type Vec3 } from '@/lib/layout';
import { live } from '@/lib/store';
import { fresnelFrag, fresnelVert } from './shaders';
import { blendFor, litOf, nodePos, pointerHandlers, S, useDispose } from './state';
import { makeGlowGeometry, useGlowMaterial } from './glow';
import type { Palette } from '@/lib/palette';

const RING_SEGMENTS = 96;
const TOOL_COUNT = 10;
const tmp: Vec3 = [0, 0, 0];
const col = new THREE.Color();

export function useFresnel(color: string, light: boolean, intensity = 1.2) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fresnelVert,
        fragmentShader: fresnelFrag,
        transparent: true,
        depthWrite: false,
        blending: blendFor(light),
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
          uTime: { value: 0 },
          uLight: { value: light ? 1 : 0 },
        },
      }),
    [color, light, intensity],
  );
  useDispose(mat);
  return mat;
}

export function Core({ pal, light }: { pal: Palette; light: boolean }) {
  const shell = useFresnel(pal.core, light, 1.4);
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.LineSegments>(null);
  const gyro = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const wireGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.05, 1)), []);
  const ringGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 2.1, 0, Math.sin(a) * 2.1));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  const haloMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: blendFor(light),
        uniforms: { uColor: { value: new THREE.Color(pal.core) }, uI: { value: 1 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uColor; uniform float uI; varying vec2 vUv;
          void main(){ float d = length(vUv - 0.5) * 2.0; float a = pow(max(1.0 - d, 0.0), 3.0) * 0.55 * uI; gl_FragColor = vec4(uColor, a); }`,
      }),
    [light, pal.core],
  );
  useDispose(haloMat);
  const handlers = useMemo(() => pointerHandlers(() => 'rap'), []);

  useFrame(({ camera }, dt) => {
    nodePos('rap').set(0, 0, 0);
    shell.uniforms.uTime.value = S.time;
    const lit = litOf('rap');
    shell.uniforms.uIntensity.value = 1.1 + lit * 0.9;
    haloMat.uniforms.uI.value = (0.7 + lit * 0.6) * (light ? 0.18 : 1);
    const spin = live.reducedMotion ? 0 : dt;
    if (wire.current) {
      wire.current.rotation.y += spin * 0.12;
      wire.current.rotation.x += spin * 0.05;
    }
    if (gyro.current) {
      gyro.current.children.forEach((c, i) => {
        c.rotation.y += spin * (0.1 + i * 0.07) * (i % 2 ? -1 : 1);
      });
    }
    if (halo.current) halo.current.quaternion.copy(camera.quaternion);
    if (group.current) {
      const s = 1 + Math.sin(S.time * 1.4) * 0.015 * (live.reducedMotion ? 0 : 1);
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh material={shell} {...handlers}>
        <sphereGeometry args={[1.5, 48, 32]} />
      </mesh>
      <lineSegments ref={wire} geometry={wireGeo}>
        <lineBasicMaterial color={pal.core} transparent opacity={light ? 0.5 : 0.35} depthWrite={false} />
      </lineSegments>
      <group ref={gyro}>
        {[0.35, -0.6, 1.2].map((tilt, i) => (
          <group key={i} rotation={[tilt, 0, tilt * 0.6]}>
            <lineLoop geometry={ringGeo} scale={1 + i * 0.18}>
              <lineBasicMaterial color={pal.accent} transparent opacity={0.22} depthWrite={false} />
            </lineLoop>
          </group>
        ))}
      </group>
      <mesh ref={halo} material={haloMat} raycast={() => null}>
        <planeGeometry args={[11, 11]} />
      </mesh>
    </group>
  );
}

export function Satellites({ pal, light }: { pal: Palette; light: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const glowMat = useGlowMaterial(light, { halo: 0.7 });
  const glowGeo = useMemo(() => makeGlowGeometry(apps.length + TOOL_COUNT), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const handlers = useMemo(() => pointerHandlers((e) => (e.instanceId != null ? apps[e.instanceId]?.id : undefined)), []);

  // all orbit rings in one LineSegments, RGBA per vertex
  const rings = useMemo(() => {
    const n = orbits.length * RING_SEGMENTS * 2;
    const pos = new Float32Array(n * 3);
    const p: Vec3 = [0, 0, 0];
    let k = 0;
    orbits.forEach((o) => {
      for (let s = 0; s < RING_SEGMENTS; s++) {
        for (const ss of [s, s + 1]) {
          const t = ((ss / RING_SEGMENTS) * Math.PI * 2 - o.phase) / o.speed;
          orbitPosition(o, t, p);
          pos.set(p, k);
          k += 3;
        }
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 4), 4).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, []);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    if (!m.boundingSphere) m.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 30);
    const t = live.reducedMotion ? 0 : S.time;
    const gp = glowGeo.attributes.position.array as Float32Array;
    const gc = glowGeo.attributes.aColor.array as Float32Array;
    const gs = glowGeo.attributes.aSize.array as Float32Array;
    const ga = glowGeo.attributes.aAlpha.array as Float32Array;
    const rc = rings.attributes.color.array as Float32Array;

    orbits.forEach((o, i) => {
      orbitPosition(o, t, tmp);
      nodePos(o.id).set(tmp[0], tmp[1], tmp[2]);
      const lit = litOf(o.id);
      const fade = 1 - S.dim * (1 - lit) * 0.75;
      dummy.position.set(tmp[0], tmp[1], tmp[2]);
      dummy.rotation.set(S.time * 0.5 + i, S.time * 0.7, 0);
      dummy.scale.setScalar(0.85 + lit * 0.5);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      col.set(o.ai ? pal.category.ai : pal.accent).multiplyScalar(light ? 1 : 0.6 + 0.6 * fade);
      m.setColorAt(i, col);

      gp.set(tmp, i * 3);
      col.set(o.ai ? pal.category.ai : pal.accent);
      gc.set([col.r, col.g, col.b], i * 3);
      gs[i] = 1.6 + lit * 1.6;
      ga[i] = (0.35 + lit * 0.65) * fade;

      const ra = (0.05 + lit * 0.28) * (1 - S.morph * 0.7);
      const base = i * RING_SEGMENTS * 2 * 4;
      for (let v = 0; v < RING_SEGMENTS * 2; v++) {
        rc[base + v * 4] = col.r;
        rc[base + v * 4 + 1] = col.g;
        rc[base + v * 4 + 2] = col.b;
        rc[base + v * 4 + 3] = ra;
      }
    });

    // MCP tool ring around the core, lit in the AI section
    const ai = litOf('ai');
    for (let j = 0; j < TOOL_COUNT; j++) {
      const idx = apps.length + j;
      const a = (j / TOOL_COUNT) * Math.PI * 2 + t * 0.6;
      const r = 2.55;
      gp.set([Math.cos(a) * r, Math.sin(a * 2 + j) * 0.25, Math.sin(a) * r], idx * 3);
      col.set(pal.category.ai);
      gc.set([col.r, col.g, col.b], idx * 3);
      gs[idx] = 0.5 + ai * 0.5;
      ga[idx] = ai;
    }

    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    glowGeo.attributes.position.needsUpdate = true;
    glowGeo.attributes.aColor.needsUpdate = true;
    glowGeo.attributes.aSize.needsUpdate = true;
    glowGeo.attributes.aAlpha.needsUpdate = true;
    rings.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments geometry={rings} raycast={() => null}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={blendFor(light)} />
      </lineSegments>
      <instancedMesh ref={mesh} args={[undefined, undefined, apps.length]} frustumCulled={false} {...handlers}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <points geometry={glowGeo} material={glowMat} raycast={() => null} />
    </group>
  );
}
