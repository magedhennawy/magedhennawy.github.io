import { useEffect, useRef, type ReactNode } from 'react';
import { apps, categories, eras, proofLabel, skills, ventures, type Level } from '@/data/profile';
import { store, useStore, type NodeKind } from '@/lib/store';

export const LEVEL_LABEL: Record<Level, string> = { 4: 'Core', 3: 'Advanced', 2: 'Proficient', 1: 'Emerging' };

// data for the evidence card
export function describe(id: string) {
  const skill = skills.find((s) => s.id === id);
  if (skill)
    return {
      kind: 'skill' as NodeKind,
      eyebrow: `${categories[skill.category].label} · ${LEVEL_LABEL[skill.level]}`,
      title: skill.name,
      body: skill.evidence,
      relatedLabel: 'Proven in',
      related: skill.proof,
      color: skill.category,
      href: undefined as string | undefined,
    };
  const provers = skills.filter((s) => s.proof.includes(id)).map((s) => s.id);
  const app = apps.find((a) => a.id === id);
  if (app)
    return { kind: 'app' as NodeKind, eyebrow: `Built on RAP · ${app.domain}`, title: app.name, body: app.blurb, relatedLabel: 'Skills', related: provers, color: app.ai ? 'ai' : undefined, href: undefined };
  const era = eras.find((e) => e.id === id);
  if (era)
    return { kind: 'era' as NodeKind, eyebrow: `${era.period} · ${era.role}`, title: era.org, body: era.headline, relatedLabel: 'Skills proven here', related: provers, color: undefined, href: `#${era.id}` };
  const v = ventures.find((x) => x.id === id);
  if (v)
    return { kind: 'venture' as NodeKind, eyebrow: `Venture · ${v.role}`, title: v.name, body: v.blurb, relatedLabel: 'Skills', related: provers, color: undefined, href: v.url };
  return {
    kind: 'core' as NodeKind,
    eyebrow: 'Platform core',
    title: 'RAP',
    body: 'A start-to-production platform: auth kernel, domain-driven backend framework, Vue component library, Terraform modules and security-gated CI, used by ~10 production apps.',
    relatedLabel: 'Runs',
    related: apps.map((a) => a.id),
    color: undefined,
    href: '#platform',
  };
}

const swatch: Record<string, string> = {
  frontend: 'bg-frontend',
  backend: 'bg-backend',
  cloud: 'bg-cloud',
  security: 'bg-security',
  ai: 'bg-ai',
};

// Details for the selected node. Related items are buttons that select that node.
export function EvidenceCard() {
  const focus = useStore((s) => s.focus);
  const heading = useRef<HTMLHeadingElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const region = useRef<HTMLDivElement>(null);
  const d = focus ? describe(focus.id) : null;

  useEffect(() => {
    if (focus?.source === 'pointer') {
      // move focus into the card and remember where it came from
      // (clicking a chip re-keys the card, so activeElement can be <body> here)
      const active = document.activeElement as HTMLElement | null;
      if (active && active !== document.body && !region.current?.contains(active)) returnTo.current = active;
      heading.current?.focus({ preventScroll: true });
    } else if (!focus && returnTo.current) {
      // card closed: put focus back
      const el = returnTo.current;
      returnTo.current = null;
      if (el.isConnected && (document.activeElement === document.body || !document.activeElement)) el.focus({ preventScroll: true });
    }
  }, [focus]);

  return (
    <div
      ref={region}
      role="region"
      aria-label="Selected item details"
      aria-live={focus?.source === 'pointer' ? 'polite' : 'off'}
      className="no-print pointer-events-none fixed inset-x-3 bottom-3 z-30 flex justify-end sm:inset-x-auto sm:bottom-6 sm:right-6"
    >
      {d && focus && (
        <div className="panel w-full max-w-sm p-5 sm:w-96" key={focus.id}>
          <div className="flex items-start justify-between gap-3">
            <p className="eyebrow flex items-center gap-2">
              {d.color && <span className={`inline-block h-2 w-2 rounded-full ${swatch[d.color]}`} aria-hidden="true" />}
              {d.eyebrow}
            </p>
            <button
              type="button"
              onClick={() => store.setFocus(null)}
              className="-mr-1 -mt-1 rounded-full p-1 text-muted hover:text-fg"
              aria-label="Close details"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <h2 ref={heading} tabIndex={-1} className="mt-2 text-xl font-semibold tracking-tight outline-none">
            {d.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
          {d.related.length > 0 && (
            <>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted">{d.relatedLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {d.related.slice(0, 12).map((r) => (
                  <li key={r}>
                    <button
                      type="button"
                      className="chip hover:border-accent hover:text-accent"
                      onClick={() => store.setFocus({ id: r, kind: describe(r).kind, source: 'pointer' })}
                    >
                      {proofLabel(r) === r ? (skills.find((s) => s.id === r)?.name ?? r) : proofLabel(r)}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {d.href && (
            <a className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline" href={d.href} {...(d.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {d.href.startsWith('http') ? `Visit ${d.title} ↗` : 'Read more ↓'}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// Button version of a 3D node. Hover/focus previews it in the scene, click/Enter opens the card.
export function NodeButton({
  id,
  kind,
  className = '',
  children,
  expanded,
  onToggle,
}: {
  id: string;
  kind: NodeKind;
  className?: string;
  children: ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const active = useStore((s) => s.focus?.id === id || s.hover === id);
  return (
    <button
      type="button"
      className={`${className} ${active ? 'border-accent text-accent' : ''}`}
      aria-expanded={expanded}
      onMouseEnter={() => store.setHover(id)}
      onMouseLeave={() => store.setHover(null)}
      onFocus={(e) => {
        if (e.currentTarget.matches(':focus-visible')) store.setFocus({ id, kind, source: 'keyboard' });
      }}
      onBlur={() => {
        const f = store.get().focus;
        if (f?.id === id && f.source === 'keyboard') store.setFocus(null);
      }}
      onClick={() => {
        onToggle?.();
        const f = store.get().focus;
        store.setFocus(f?.id === id && f.source === 'pointer' ? null : { id, kind, source: 'pointer' });
      }}
    >
      {children}
    </button>
  );
}
