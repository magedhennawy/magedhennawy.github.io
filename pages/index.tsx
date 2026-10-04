import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import SceneLayer from '@/components/SceneLayer';
import SectionRail from '@/components/SectionRail';
import ShaderHero from '@/components/ShaderHero';
import StaticBackdrop from '@/components/StaticBackdrop';
import { EvidenceCard, LEVEL_LABEL, NodeButton } from '@/components/nodes';
import { apps, categories, education, eras, person, resume, skills, ventures, type Category } from '@/data/profile';
import { CATEGORY_ORDER } from '@/lib/layout';
import { seo } from '@/lib/seo';
import { live, prefersReducedMotion } from '@/lib/store';

const STATS = [
  { value: '8 yrs', label: 'shipping enterprise software' },
  { value: '~10', label: 'production apps on my platform' },
  { value: '28k+', label: 'downloads of an OSS library I started' },
  { value: '770', label: 'vulnerability findings remediated' },
];

const dot: Record<Category, string> = {
  frontend: 'bg-frontend',
  backend: 'bg-backend',
  cloud: 'bg-cloud',
  security: 'bg-security',
  ai: 'bg-ai',
};
const text: Record<Category, string> = {
  frontend: 'text-frontend',
  backend: 'text-backend',
  cloud: 'text-cloud',
  security: 'text-security',
  ai: 'text-ai',
};

function hasWebGL2() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

function readPref(): string | null {
  try {
    return localStorage.getItem('scene');
  } catch {
    return null;
  }
}

export default function Home() {
  const [available, setAvailable] = useState(false);
  const [scene, setScene] = useState(false);
  const [eager, setEager] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const ok = hasWebGL2();
    const rm = matchMedia('(prefers-reduced-motion: reduce)');
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduced = prefersReducedMotion();
    live.reducedMotion = reduced;
    live.coarse = matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const pref = readPref();
    setAvailable(ok);
    // reduced motion / data saver: start with 3D off
    setScene(ok && (pref ? pref === 'on' : !reduced && !conn?.saveData));
    const onChange = () => (live.reducedMotion = prefersReducedMotion());
    rm.addEventListener('change', onChange);
    return () => rm.removeEventListener('change', onChange);
  }, []);

  const toggleScene = useCallback(() => {
    setEager(true);
    setScene((s) => {
      try {
        localStorage.setItem('scene', s ? 'off' : 'on');
      } catch {
        // ignore
      }
      return !s;
    });
  }, []);

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      {!scene && <StaticBackdrop />}
      <SceneLayer enabled={scene} eager={eager} />
      <Header scene={scene} sceneAvailable={available} onToggleScene={toggleScene} />
      <SectionRail />
      <EvidenceCard />

      <main id="main" className="pointer-events-none relative z-10">
        <section id="top" data-scene="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
          <ShaderHero />
          <div className="pointer-events-auto relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6">
            <p className="eyebrow hud-tick">{person.title}</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="block print:inline">Maged</span>{' '}
              <span className="block print:inline">Hennawy</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{person.tagline}</p>
            <p className="print-only mt-2 text-sm">
              {person.email} · github.com/magedhennawy · linkedin.com/in/magedhennawy · {person.location}
            </p>
            <p className="print-only mt-2 text-sm">{person.summary}</p>
            <ul className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4" aria-label="At a glance">
              {STATS.map((s) => (
                <li key={s.label} className="border-l border-accent/40 pl-3">
                  <span className="block font-mono text-2xl text-fg">{s.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted">{s.label}</span>
                </li>
              ))}
            </ul>
            <div className="no-print mt-10 flex flex-wrap gap-3">
              <a href="#platform" className="btn btn-primary">
                Explore the platform <span aria-hidden="true">↓</span>
              </a>
              <a href={`mailto:${person.email}`} className="btn">
                Email me
              </a>
              <a href={resume.pdfPath} download className="btn">
                Download résumé <span className="sr-only">(PDF)</span>
                <span aria-hidden="true" className="font-mono text-[10px] text-muted">PDF</span>
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <section id="platform" data-scene="platform" aria-labelledby="platform-h" className="flex min-h-[100svh] items-center py-24">
            <div className="panel max-w-xl p-6 sm:p-8">
              <p className="eyebrow">01 · The platform</p>
              <h2 id="platform-h" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                RAP, the platform behind ~10 production apps
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                <strong className="text-fg">RAP</strong> is a start-to-production platform I architected and own for the
                Royal Canadian Air Force: an auth kernel, a domain-driven backend framework, a Vue component library,
                Terraform modules and security-gated CI. New projects go from weeks of setup to{' '}
                <strong className="text-fg">under an hour</strong>. These production apps orbit it:
              </p>
              <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">
                {apps.map((a) => (
                  <li key={a.id}>
                    <NodeButton
                      id={a.id}
                      kind="app"
                      className="flex w-full items-center gap-2 rounded-lg border border-line/15 px-3 py-2 text-left text-sm transition-colors hover:border-accent"
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rotate-45 ${a.ai ? 'bg-ai' : 'bg-accent'}`} aria-hidden="true" />
                      <span>
                        {a.name}
                        <span className="sr-only">: {a.blurb}</span>
                      </span>
                    </NodeButton>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                <span className="text-ai">Amber</span> marks apps with production AI features.
              </p>
            </div>
          </section>

          <div id="career" aria-labelledby="career-h">
            <h2 id="career-h" className="sr-only">
              Career
            </h2>
            {eras.map((e, i) => (
              <section
                key={e.id}
                id={e.id}
                data-scene={e.id}
                aria-labelledby={`${e.id}-h`}
                className="flex min-h-[100svh] items-center py-24"
              >
                <article className="panel max-w-xl p-6 sm:p-8">
                  <p className="eyebrow">
                    0{i + 2} · {e.period}
                  </p>
                  <h3 id={`${e.id}-h`} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {e.org}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {e.role} · {e.place}
                  </p>
                  <p className="mt-4 text-lg leading-snug">{e.headline}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                    {e.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </section>
            ))}
          </div>

          <section id="ventures" data-scene="ventures" aria-labelledby="ventures-h" className="flex min-h-[100svh] items-center py-24">
            <div className="max-w-xl">
              <div className="panel p-6 sm:p-8">
                <p className="eyebrow">07 · Ventures</p>
                <h2 id="ventures-h" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Founder and side projects
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Side projects on a leaner, edge-first stack: Cloudflare Workers, Fly.io, Supabase.
                </p>
              </div>
              <ul className="mt-3 space-y-3">
                {ventures.map((v) => (
                  <li key={v.id} className="panel p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-xl font-semibold">
                        <NodeButton id={v.id} kind="venture" className="text-left hover:text-accent">
                          {v.name}
                        </NodeButton>
                      </h3>
                      <span className="font-mono text-xs text-muted">{v.role}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.blurb}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {v.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                      {v.url && (
                        <a href={v.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm text-accent underline-offset-4 hover:underline">
                          {v.url.replace('https://', '')} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="skills" data-scene="skills" aria-labelledby="skills-h" className="min-h-[100svh] py-24">
            <div className="panel max-w-xl p-6 sm:p-8">
              <p className="eyebrow">08 · Skills</p>
              <h2 id="skills-h" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                What I work with, and where
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                In 3D each skill is a tower, grouped by discipline, with height showing depth of experience. Select a
                skill to see where I used it.
              </p>
            </div>
            <div className="mt-3 max-w-xl space-y-3">
              {CATEGORY_ORDER.map((c) => (
                <div key={c} className="panel p-5">
                  <h3 className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] ${text[c]}`}>
                    <span className={`h-2 w-2 rounded-full ${dot[c]}`} aria-hidden="true" />
                    {categories[c].label}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{categories[c].blurb}</p>
                  <ul className="mt-3 space-y-1">
                    {skills
                      .filter((s) => s.category === c)
                      .map((s) => (
                        <li key={s.id}>
                          <NodeButton
                            id={s.id}
                            kind="skill"
                            expanded={open === s.id}
                            onToggle={() => setOpen((o) => (o === s.id ? null : s.id))}
                            className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-fg/5"
                          >
                            <span>{s.name}</span>
                            <span className="flex shrink-0 items-center gap-0.5" aria-label={`Level: ${LEVEL_LABEL[s.level]}`} role="img">
                              {[1, 2, 3, 4].map((n) => (
                                <span key={n} className={`h-2.5 w-1 rounded-sm ${n <= s.level ? dot[c] : 'bg-line/20'}`} />
                              ))}
                            </span>
                          </NodeButton>
                          {open === s.id && <p className="px-2 pb-2 pt-1 text-xs leading-relaxed text-muted">{s.evidence}</p>}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" data-scene="contact" aria-labelledby="contact-h" className="flex min-h-[100svh] flex-col justify-center py-24">
            <div className="panel max-w-xl p-6 sm:p-8">
              <p className="eyebrow">09 · Contact</p>
              <h2 id="contact-h" className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                Get in touch
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Platform engineering, applied AI, DevSecOps or software for regulated environments. Email is the fastest way to reach me.
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                <li>
                  <a href={`mailto:${person.email}`} className="btn btn-primary">
                    {person.email}
                  </a>
                </li>
                <li>
                  <a href={person.github} target="_blank" rel="noopener noreferrer me" className="btn">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer me" className="btn">
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <Link href="/resume" className="btn">
                    Résumé
                  </Link>
                </li>
              </ul>
              <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Education</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {education.map((e) => (
                  <li key={e.title}>
                    <span className="text-fg">{e.title}</span> <span className="text-muted">· {e.org}</span>
                  </li>
                ))}
              </ul>
            </div>
            <footer className="no-print pointer-events-auto mt-10 max-w-xl text-xs leading-relaxed text-muted">
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {person.name}. Built with Next.js, react-three-fiber and GLSL.{' '}
              <a className="underline underline-offset-4 hover:text-fg" href="https://github.com/magedhennawy/magedhennawy.github.io" target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </footer>
          </section>
        </div>
      </main>
    </>
  );
}
