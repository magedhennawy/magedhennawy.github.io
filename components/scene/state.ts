import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { apps, eras, skills, ventures } from '@/data/profile';
import { sectionHighlights } from '@/lib/layout';
import { palette, type Palette } from '@/lib/palette';
import { sectionAt, store, live, type NodeKind } from '@/lib/store';

// per-frame scene state (not React state)
export const S = {
  time: 0,
  pos: new Map<string, THREE.Vector3>(),
  lit: new Map<string, number>(),
  dim: 0,
  // 0 constellation, 1 city
  morph: 0,
};

export function nodePos(id: string): THREE.Vector3 {
  let v = S.pos.get(id);
  if (!v) {
    v = new THREE.Vector3();
    S.pos.set(id, v);
  }
  return v;
}

export const litOf = (id: string) => S.lit.get(id) ?? 0;


export const ALL_IDS = [
  'rap',
  ...skills.map((s) => s.id),
  ...apps.map((a) => a.id),
  ...eras.map((e) => e.id),
  ...ventures.map((v) => v.id),
];

const related = new Map<string, Set<string>>();
for (const id of ALL_IDS) related.set(id, new Set([id]));
for (const s of skills) {
  for (const p of s.proof) {
    related.get(s.id)!.add(p);
    related.get(p)?.add(s.id);
  }
}
apps.forEach((a) => related.get('rap')!.add(a.id));
related.get('rcaf')!.add('rap');

export const relatedTo = (id: string) => related.get(id) ?? new Set([id]);

const sectionSets = new Map<string, Set<string>>();
for (const [sec, ids] of Object.entries(sectionHighlights)) {
  // only the first id pulls in related skills
  const set = new Set<string>(ids);
  const expand = sec === 'ventures' ? ids : ids.slice(0, 1);
  expand.forEach((id) => relatedTo(id).forEach((r) => set.add(r)));
  sectionSets.set(sec, set);
}

export const kindOf = (id: string): NodeKind =>
  id === 'rap'
    ? 'core'
    : skills.some((s) => s.id === id)
      ? 'skill'
      : apps.some((a) => a.id === id)
        ? 'app'
        : eras.some((e) => e.id === id)
          ? 'era'
          : 'venture';

const EMPTY = new Set<string>();

// called once per frame, before anything reads S.lit
export function tickHighlights(dt: number) {
  const { focus, hover } = store.get();
  let target: Set<string>;
  if (focus) target = relatedTo(focus.id);
  else {
    const { a, b, k } = sectionAt(live.scrollT);
    target = sectionSets.get(k < 0.6 ? a : b) ?? EMPTY;
  }
  if (hover) {
    target = new Set(target);
    relatedTo(hover).forEach((r) => target.add(r));
  }
  const rate = live.reducedMotion ? 1 : 1 - Math.exp(-dt * 6);
  for (const id of ALL_IDS) {
    const cur = S.lit.get(id) ?? 0;
    S.lit.set(id, cur + ((target.has(id) ? 1 : 0) - cur) * rate);
  }
  S.dim += ((target.size ? 1 : 0) - S.dim) * rate;
}


export function useSceneTheme(): { light: boolean; pal: Palette } {
  const [light, setLight] = useState(
    () => typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light',
  );
  useEffect(() => {
    const el = document.documentElement;
    const mo = new MutationObserver(() => {
      const l = el.dataset.theme === 'light';
      live.theme = l ? 'light' : 'dark';
      setLight(l);
    });
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);
  return { light, pal: light ? palette.light : palette.dark };
}

export const blendFor = (light: boolean) => (light ? THREE.NormalBlending : THREE.AdditiveBlending);

export function pointerHandlers(getId: (e: { index?: number; instanceId?: number }) => string | undefined) {
  return {
    onPointerOver: (e: { stopPropagation: () => void; index?: number; instanceId?: number }) => {
      e.stopPropagation();
      const id = getId(e);
      if (!id) return;
      store.setHover(id);
      document.body.style.cursor = 'pointer';
    },
    onPointerMove: (e: { stopPropagation: () => void; index?: number; instanceId?: number }) => {
      const id = getId(e);
      if (id && store.get().hover !== id) store.setHover(id);
    },
    onPointerOut: () => {
      store.setHover(null);
      document.body.style.cursor = '';
    },
    onClick: (e: { stopPropagation: () => void; index?: number; instanceId?: number }) => {
      e.stopPropagation();
      const id = getId(e);
      if (id) store.setFocus({ id, kind: kindOf(id), source: 'pointer' });
    },
  };
}

export function useDispose(...objs: { dispose: () => void }[]) {
  useEffect(() => () => objs.forEach((o) => o.dispose()), objs); // eslint-disable-line react-hooks/exhaustive-deps
}
