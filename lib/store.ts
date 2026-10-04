import { useSyncExternalStore } from 'react';

// Shared between the page and the scene. `live` is read every frame; focus/hover are subscribable.

export type NodeKind = 'skill' | 'app' | 'era' | 'venture' | 'core';
export type Focus = { id: string; kind: NodeKind; source: 'pointer' | 'keyboard' } | null;
export type Quality = 'high' | 'low';

type State = {
  focus: Focus;
  hover: string | null;
  sceneReady: boolean;
};

const state: State = { focus: null, hover: null, sceneReady: false };
const listeners = new Set<() => void>();

export const live = {
  // section index + blend to the next section
  scrollT: 0,
  sections: [] as string[],
  pointer: { x: 0, y: 0 },
  reducedMotion: false,
  theme: 'dark' as 'dark' | 'light',
  quality: 'high' as Quality,
  coarse: false,
};

function emit() {
  listeners.forEach((l) => l());
}

export const store = {
  get: () => state,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  setFocus(focus: Focus) {
    if (state.focus?.id === focus?.id && state.focus?.source === focus?.source) return;
    state.focus = focus;
    emit();
  },
  setHover(id: string | null) {
    if (state.hover === id) return;
    state.hover = id;
    emit();
  },
  setSceneReady(v: boolean) {
    state.sceneReady = v;
    emit();
  },
};

export function useStore<T>(select: (s: State) => T): T {
  return useSyncExternalStore(
    store.subscribe,
    () => select(state),
    () => select(state),
  );
}

export function sectionAt(t: number): { a: string; b: string; k: number } {
  const s = live.sections;
  if (!s.length) return { a: 'hero', b: 'hero', k: 0 };
  const i = Math.max(0, Math.min(s.length - 1, Math.floor(t)));
  const j = Math.min(s.length - 1, i + 1);
  return { a: s[i], b: s[j], k: t - Math.floor(t) };
}

// ?motion=reduced forces it for testing
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return /[?&]motion=reduced\b/.test(window.location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
}
