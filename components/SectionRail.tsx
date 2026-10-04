import { useEffect, useState } from 'react';

const STOPS = [
  { id: 'top', label: 'Start' },
  { id: 'platform', label: 'Platform' },
  { id: 'ibm', label: 'IBM ’17' },
  { id: 'rbc', label: 'RBC ’20' },
  { id: 'clarify', label: 'Clarify ’21' },
  { id: 'rcaf', label: 'RCAF ’25' },
  { id: 'ai', label: 'Applied AI' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

// right-edge section rail (xl screens)
export default function SectionRail() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    STOPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Section progress" className="no-print fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ol className="relative flex flex-col gap-3 border-r border-line/20 pr-3">
        {STOPS.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="flex justify-end">
              <a
                href={`#${s.id}`}
                aria-current={on ? 'location' : undefined}
                className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              >
                <span className={`transition-opacity ${on ? 'text-accent opacity-100' : 'text-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}>
                  {s.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all ${on ? 'w-6 bg-accent shadow-[0_0_8px_rgb(var(--accent))]' : 'w-3 bg-line/50 group-hover:w-4'}`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
