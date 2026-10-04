import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { apps, categories, eras, skills, ventures } from '@/data/profile';
import { CATEGORY_ORDER, ventureSize } from '@/lib/layout';
import { live, sectionAt, store } from '@/lib/store';
import { S, litOf } from './state';

// Pooled DOM labels, positioned each frame (cheaper than one drei <Html> per node).
// Landmarks show when near the camera; skills/apps show while highlighted.

type Meta = { text: string; lift: number; landmark: boolean; color?: string };

const META = new Map<string, Meta>();
skills.forEach((s) => META.set(s.id, { text: s.name, lift: 0, landmark: false }));
apps.forEach((a) => META.set(a.id, { text: a.name, lift: 0, landmark: false }));
META.set('rap', { text: 'RAP · platform core', lift: 2.7, landmark: true });
eras
  .filter((e) => ['ibm', 'rbc', 'clarify'].includes(e.id))
  .forEach((e) => META.set(e.id, { text: `${e.org} · ${e.period.replace(' – ', '–')}`, lift: 3.1, landmark: true }));
ventures.forEach((v) => META.set(v.id, { text: v.name, lift: ventureSize[v.id] + 1.2, landmark: true }));
CATEGORY_ORDER.forEach((c) =>
  META.set(`cat:${c}`, { text: `◇ ${categories[c].label}`, lift: 0, landmark: true, color: `rgb(var(--c-${c}))` }),
);

const IDS = [...META.keys()];
const v = new THREE.Vector3();

export function Labels() {
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const max = live.coarse ? 12 : 22;
  const pool = useRef<{ el: HTMLDivElement; id: string | null }[]>([]);
  const container = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const d = document.createElement('div');
    d.setAttribute('aria-hidden', 'true');
    d.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;contain:strict;';
    return d;
  }, []);

  useEffect(() => {
    const parent = gl.domElement.parentElement;
    if (!parent || !container) return;
    parent.appendChild(container);
    pool.current = Array.from({ length: max }, () => {
      const el = document.createElement('div');
      el.className = 'hud-label';
      el.style.cssText = 'position:absolute;left:0;top:0;opacity:0;will-change:transform,opacity;';
      container.appendChild(el);
      return { el, id: null };
    });
    return () => {
      container.replaceChildren();
      container.remove();
      pool.current = [];
    };
  }, [gl, container, max]);

  useFrame(() => {
    const slots = pool.current;
    if (!slots.length) return;
    const { hover, focus } = store.get();
    // no labels on the hero until you scroll
    const sec = sectionAt(live.scrollT);
    const heroGate = sec.a === 'hero' ? sec.k * sec.k : 1;

    const score = (id: string) => {
      if (id === hover || id === focus?.id) return 3;
      const m = META.get(id)!;
      const p = S.pos.get(id);
      if (!p) return 0;
      if (m.landmark) {
        const d = camera.position.distanceTo(p);
        return Math.max(litOf(id), Math.min(1, (70 - d) / 30)) * (id.startsWith('cat:') ? 0.9 : 1);
      }
      return litOf(id) > 0.3 ? litOf(id) : 0;
    };

    const picked = IDS.map((id) => [id, score(id)] as const)
      .filter(([, s]) => s > 0.05)
      .sort((a, b) => b[1] - a[1])
      .slice(0, max);
    const scores = new Map(picked);

    // keep labels in their slot while still picked
    slots.forEach((s) => {
      if (s.id && !scores.has(s.id)) s.id = null;
    });
    const assigned = new Set(slots.map((s) => s.id));
    for (const [id] of picked) {
      if (assigned.has(id)) continue;
      const free = slots.find((s) => !s.id);
      if (!free) break;
      const m = META.get(id)!;
      free.id = id;
      free.el.textContent = m.text;
      free.el.classList.toggle('hud-tick', !m.landmark);
      free.el.style.color = m.color ?? '';
    }

    for (const s of slots) {
      if (!s.id) {
        if (s.el.style.opacity !== '0') s.el.style.opacity = '0';
        continue;
      }
      const m = META.get(s.id)!;
      const p = S.pos.get(s.id)!;
      v.set(p.x, p.y + m.lift, p.z).project(camera);
      if (v.z > 1 || Math.abs(v.x) > 1.05 || Math.abs(v.y) > 1.05) {
        s.el.style.opacity = '0';
        continue;
      }
      const x = (v.x * 0.5 + 0.5) * size.width;
      const y = (-v.y * 0.5 + 0.5) * size.height;
      // fade under the header
      const fadeTop = Math.min(1, Math.max(0, (y - 70) / 40));
      s.el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,${m.landmark ? '-50%' : '-180%'})`;
      const sc = Math.min(1, scores.get(s.id) ?? 0);
      const gate = s.id === hover || s.id === focus?.id ? 1 : heroGate;
      s.el.style.opacity = (Math.min(1, m.landmark ? sc : (sc - 0.2) * 1.4) * fadeTop * gate).toFixed(2);
      s.el.dataset.on = s.id === hover || s.id === focus?.id || (m.landmark && !m.color) ? 'true' : 'false';
    }
  });

  return null;
}
