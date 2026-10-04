import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { live, store, useStore } from '@/lib/store';

// three.js only loads through this import
const Experience = dynamic(() => import('./scene/Experience'), { ssr: false, loading: () => null });

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export default function SceneLayer({ enabled, eager = false }: { enabled: boolean; eager?: boolean }) {
  const [mount, setMount] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const ready = useStore((s) => s.sceneReady);

  // load the scene on first interaction or after ~4s; the shader hero covers first paint
  useEffect(() => {
    if (!enabled) {
      setMount(false);
      store.setSceneReady(false);
      return;
    }
    if (eager) {
      // user turned 3D on, load now
      setMount(true);
      return;
    }
    let done = false;
    const events = ['scroll', 'pointermove', 'pointerdown', 'keydown', 'touchstart'] as const;
    const go = () => {
      if (done) return;
      done = true;
      setMount(true);
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const timer = window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(go, { timeout: 2000 }) : go()), 4000);
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, go));
    };
  }, [enabled, eager]);

  // scrollT = section index + progress into the hand-off to the next section
  useEffect(() => {
    let tops: number[] = [];
    let raf = 0;
    let focusT = 0;
    let focusId: string | undefined;

    const measure = () => {
      const list = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
      live.sections = list.map((e) => e.dataset.scene!);
      tops = list.map((e) => e.getBoundingClientRect().top + window.scrollY);
      update();
    };

    const update = () => {
      raf = 0;
      if (!tops.length) return;
      const H = window.innerHeight;
      const anchor = window.scrollY + H * 0.35;
      let i = 0;
      while (i < tops.length - 1 && tops[i + 1] <= anchor) i++;
      // camera holds while a section is read and only moves in the last ~0.9 viewport
      let frac = 0;
      const next = tops[i + 1];
      if (next != null) {
        const span = Math.max(H * 0.2, Math.min(H * 0.9, next - tops[i] - H * 0.35));
        frac = clamp01((anchor - (next - span)) / span);
      }
      live.scrollT = i + frac;

      if (wrap.current) {
        const heroFade = live.sections[0] === 'hero' && i === 0 ? 0.4 + 0.6 * frac : 1;
        wrap.current.style.opacity = String(heroFade);
      }

      // clicked nodes lose focus once you scroll on
      const f = store.get().focus;
      if (f?.source === 'pointer' && Math.abs(live.scrollT - focusT) > 0.6) store.setFocus(null);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const unsub = store.subscribe(() => {
      const id = store.get().focus?.id;
      if (id && id !== focusId) focusT = live.scrollT;
      focusId = id;
    });

    const onPointer = (e: PointerEvent) => {
      live.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      live.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') store.setFocus(null);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      unsub();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="no-print fixed inset-0 z-0"
      style={{ opacity: 0.4 }}
    >
      <div className="h-full w-full transition-opacity duration-1000" style={{ opacity: ready ? 1 : 0 }}>
        {mount && <Experience />}
      </div>
    </div>
  );
}
