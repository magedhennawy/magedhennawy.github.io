import { memo } from 'react';
import { apps } from '@/data/profile';
import { skillLayout } from '@/lib/layout';

// SVG fallback for the 3D layer (no WebGL, reduced motion, or 3D off)
function StaticBackdrop() {
  const cx = 600;
  const cy = 450;
  const k = 22; // world units → px
  const col = (c: string) => `rgb(var(--c-${c}))`;
  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute left-[18vw] top-0 h-full w-[100vw] opacity-40 md:left-[30vw] md:opacity-70"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} cx={cx} cy={cy} r={i * 70} fill="none" stroke="rgb(var(--accent))" strokeOpacity={0.1 - i * 0.012} />
        ))}
        {apps.map((a, i) => {
          const r = (4.6 + (i % 4) * 1.25) * k;
          return (
            <ellipse key={a.id} cx={cx} cy={cy} rx={r} ry={r * 0.38} fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.14" transform={`rotate(${-20 + i * 17} ${cx} ${cy})`} />
          );
        })}
        {skillLayout.map((s) => {
          const x = cx + s.star[0] * k * 0.95;
          const y = cy + s.star[2] * k * 0.55 - s.star[1] * k * 0.5;
          return (
            <g key={s.id}>
              <line x1={x} y1={y} x2={cx} y2={cy} stroke={col(s.category)} strokeOpacity="0.08" />
              <circle cx={x} cy={y} r={3 + s.level} fill={col(s.category)} fillOpacity="0.18" />
              <circle cx={x} cy={y} r={1.4 + s.level * 0.4} fill={col(s.category)} />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="60" fill="rgb(var(--accent))" fillOpacity="0.06" />
        <circle cx={cx} cy={cy} r="30" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.6" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="6" fill="rgb(var(--accent))" />
      </svg>
    </div>
  );
}

export default memo(StaticBackdrop);
