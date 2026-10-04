import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skills } from '@/data/profile';
import { CATEGORY_ORDER, categoryCenters, districtCenters, skillLayout } from '@/lib/layout';
import type { Palette } from '@/lib/palette';
import { live } from '@/lib/store';
import { makeGlowGeometry, useGlowMaterial } from './glow';
import { towerFrag, towerVert } from './shaders';
import { blendFor, litOf, nodePos, pointerHandlers, S, useDispose } from './state';

const N = skillLayout.length;
const col = new THREE.Color();
const ease = (x: number) => x * x * (3 - 2 * x);

// one thread per (skill, proof) pair
const threadPairs: [number, string][] = [];
skills.forEach((s, i) => s.proof.forEach((p) => threadPairs.push([i, p])));

export function Skills({ pal, light }: { pal: Palette; light: boolean }) {
  const glowMat = useGlowMaterial(light, { halo: 0.6 });
  const geo = useMemo(() => makeGlowGeometry(N), []);
  const towers = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const towerMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: towerVert,
        fragmentShader: towerFrag,
        transparent: true,
        depthWrite: false,
        blending: blendFor(light),
        side: THREE.DoubleSide,
        uniforms: { uMorph: { value: 0 }, uLight: { value: light ? 1 : 0 }, uTime: { value: 0 } },
      }),
    [light],
  );
  useDispose(towerMat);
  const towerGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1);
    g.translate(0, 0.5, 0);
    g.setAttribute('aLit', new THREE.InstancedBufferAttribute(new Float32Array(N), 1).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, []);

  const threads = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = threadPairs.length * 2;
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 4), 4).setUsage(THREE.DynamicDrawUsage));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 400);
    return g;
  }, []);

  const nodeHandlers = useMemo(() => pointerHandlers((e) => (e.index != null ? skillLayout[e.index]?.id : undefined)), []);
  const towerHandlers = useMemo(
    () => pointerHandlers((e) => (e.instanceId != null && S.morph > 0.5 ? skillLayout[e.instanceId]?.id : undefined)),
    [],
  );

  useFrame(() => {
    const m = ease(Math.min(1, Math.max(0, S.morph)));
    towerMat.uniforms.uMorph.value = m;
    towerMat.uniforms.uTime.value = S.time;

    const p = geo.attributes.position.array as Float32Array;
    const c = geo.attributes.aColor.array as Float32Array;
    const sz = geo.attributes.aSize.array as Float32Array;
    const al = geo.attributes.aAlpha.array as Float32Array;
    const tl = towerGeo.attributes.aLit.array as Float32Array;
    const t = live.reducedMotion ? 0 : S.time;

    skillLayout.forEach((s, i) => {
      const lit = litOf(s.id);
      // stagger nodes so the city builds up
      const k = Math.min(1, Math.max(0, m * 1.4 - (i % 7) * 0.06));
      const bob = Math.sin(t * 0.7 + i * 1.7) * 0.18 * (1 - k);
      const x = s.star[0] + (s.city[0] - s.star[0]) * k;
      const y = s.star[1] + bob + (s.city[1] + s.height * m + 0.35 - s.star[1]) * k;
      const z = s.star[2] + (s.city[2] - s.star[2]) * k;
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
      nodePos(s.id).set(x, y, z);

      col.set(pal.category[s.category]);
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
      const fade = 1 - S.dim * (1 - lit) * 0.7;
      sz[i] = (0.55 + s.level * 0.22) * (1 + lit * 0.9);
      al[i] = (0.45 + 0.55 * lit) * fade;
      tl[i] = Math.max(lit, 1 - S.dim);

      if (towers.current) {
        dummy.position.set(s.city[0], s.city[1], s.city[2]);
        dummy.scale.set(0.82, Math.max(0.001, s.height * m), 0.82);
        dummy.updateMatrix();
        towers.current.setMatrixAt(i, dummy.matrix);
        towers.current.setColorAt(i, col);
      }
    });

    const tp = threads.attributes.position.array as Float32Array;
    const tc = threads.attributes.color.array as Float32Array;
    threadPairs.forEach(([si, target], j) => {
      const a = nodePos(skills[si].id);
      const b = S.pos.get(target);
      const o = j * 6;
      tp[o] = a.x;
      tp[o + 1] = a.y;
      tp[o + 2] = a.z;
      if (b) {
        tp[o + 3] = b.x;
        tp[o + 4] = b.y;
        tp[o + 5] = b.z;
      } else {
        tp[o + 3] = a.x;
        tp[o + 4] = a.y;
        tp[o + 5] = a.z;
      }
      const la = litOf(skills[si].id);
      const lb = litOf(target);
      const both = Math.min(la, lb);
      const alpha = (0.03 + both * 0.55) * (1 - S.dim * 0.6 * (1 - both)) * (1 - m * 0.6);
      col.set(pal.category[skills[si].category]);
      for (let v = 0; v < 2; v++) {
        const q = (j * 2 + v) * 4;
        tc[q] = col.r;
        tc[q + 1] = col.g;
        tc[q + 2] = col.b;
        tc[q + 3] = alpha * (v === 0 ? 1 : 0.35);
      }
    });

    CATEGORY_ORDER.forEach((cat) => {
      const a = categoryCenters[cat];
      const b = districtCenters[cat];
      // district label: above the cluster, or on the ground outside the district
      const len = Math.hypot(b[0], b[2]) || 1;
      const gx = b[0] + (b[0] / len) * 3.4;
      const gz = b[2] + (b[2] / len) * 3.4;
      nodePos(`cat:${cat}`).set(a[0] + (gx - a[0]) * m, a[1] + 4.2 + (b[1] + 0.2 - a[1] - 4.2) * m, a[2] + (gz - a[2]) * m);
    });

    geo.attributes.position.needsUpdate = true;
    geo.attributes.aColor.needsUpdate = true;
    geo.attributes.aSize.needsUpdate = true;
    geo.attributes.aAlpha.needsUpdate = true;
    towerGeo.attributes.aLit.needsUpdate = true;
    threads.attributes.position.needsUpdate = true;
    threads.attributes.color.needsUpdate = true;
    if (towers.current) {
      towers.current.instanceMatrix.needsUpdate = true;
      if (towers.current.instanceColor) towers.current.instanceColor.needsUpdate = true;
      towers.current.visible = m > 0.01;
    }
  });

  return (
    <group>
      <lineSegments geometry={threads} raycast={() => null} frustumCulled={false}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={blendFor(light)} />
      </lineSegments>
      <instancedMesh
        ref={towers}
        args={[towerGeo, towerMat, N]}
        frustumCulled={false}
        onUpdate={(self) => (self.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, -2, 0), 30))}
        {...towerHandlers}
      />
      <points geometry={geo} material={glowMat} {...nodeHandlers} />
    </group>
  );
}
