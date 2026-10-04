import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { glowFrag, glowVert } from './shaders';
import { blendFor, S, useDispose } from './state';

// point sprites sized in world units
export function useGlowMaterial(light: boolean, opts: { halo?: number; twinkle?: boolean } = {}) {
  const halo = opts.halo ?? 0.55;
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: glowVert,
        fragmentShader: glowFrag,
        transparent: true,
        depthWrite: false,
        blending: blendFor(light),
        uniforms: {
          uScale: { value: 400 },
          uTime: { value: 0 },
          uTwinkle: { value: opts.twinkle ? 1 : 0 },
          uLight: { value: light ? 1 : 0 },
          uHalo: { value: light ? halo * 0.5 : halo },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [light, halo, opts.twinkle],
  );
  useDispose(mat);
  const height = useThree((s) => s.size.height);
  const dpr = useThree((s) => s.viewport.dpr);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useFrame(() => {
    mat.uniforms.uScale.value = (height * dpr) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
    mat.uniforms.uTime.value = S.time;
  });
  return mat;
}

export function makeGlowGeometry(count: number) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(count * 3), 3).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(count), 1).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(count), 1).setUsage(THREE.DynamicDrawUsage));
  // static bound, positions change every frame
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 400);
  return g;
}
