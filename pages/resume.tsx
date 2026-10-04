import Head from 'next/head';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE_URL, education, eras, person, resume, ventures } from '@/data/profile';

// Printable résumé. public/Maged-Hennawy-Resume.pdf is generated from this page (npm run resume).

const rcaf = eras.find((e) => e.id === 'rcaf')!;
const ai = eras.find((e) => e.id === 'ai')!;
const jobs = [
  // on paper the Applied AI work sits under the RCAF role
  { ...rcaf, points: [...rcaf.points.slice(0, 3), ...ai.points.slice(0, 2), ai.points[3], ...rcaf.points.slice(3)], stack: [...rcaf.stack, 'AWS Bedrock', 'MCP', 'pgvector', 'Casbin'] },
  ...['clarify', 'rbc', 'ibm'].map((id) => eras.find((e) => e.id === id)!),
];

function H({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2 mt-5 border-b border-slate-800 pb-0.5 text-[15px] font-semibold tracking-tight text-slate-900 print:mt-3">
      {children}
    </h2>
  );
}

export default function Resume() {
  return (
    <>
      <Head>
        <title>{`Résumé | ${person.name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={`Résumé of ${person.name}, ${person.title}. ${resume.summary.slice(0, 110)}…`} />
        <link rel="canonical" href={`${SITE_URL}/resume`} />
      </Head>

      <div className="no-print sticky top-0 z-10 border-b border-line/15 bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-[8.5in] items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="text-sm text-muted hover:text-fg">
            <span aria-hidden="true">←</span> Back to the site
          </Link>
          <div className="flex gap-2">
            <button type="button" className="btn" onClick={() => window.print()}>
              Print
            </button>
            <a href={resume.pdfPath} download className="btn btn-primary">
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <main
        id="resume"
        className="mx-auto my-6 max-w-[8.5in] bg-white px-[0.6in] py-[0.5in] text-[12.5px] leading-snug text-slate-700 shadow-2xl sm:rounded-sm print:my-0 print:max-w-none print:p-0 print:text-[10pt] print:shadow-none"
      >
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
          <div>
            <h1 className="text-[30px] font-bold leading-none tracking-tight text-slate-900">{person.name}</h1>
            <p className="mt-1.5 text-[12px] text-slate-600">
              <a href={`mailto:${person.email}`}>{person.email}</a> · <a href={person.github}>github.com/magedhennawy</a> ·{' '}
              <a href={person.linkedin}>linkedin.com/in/magedhennawy</a> · <a href={SITE_URL}>magedhennawy.github.io</a>
            </p>
          </div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1e4e8c]">{person.title}</p>
        </header>

        <p className="mt-4 rounded border border-[#c9d8ee] bg-[#f1f6fc] px-3 py-2 italic text-slate-700">{resume.summary}</p>

        <section aria-labelledby="exp">
          <H>
            <span id="exp">Experience</span>
          </H>
          {jobs.map((j) => (
            <article key={j.id} className="mb-3 break-inside-avoid-page">
              <p className="text-[10.5px] uppercase tracking-wider text-slate-500">{resume.dates[j.id]}</p>
              <h3 className="text-[14px] text-slate-900">
                <span className="font-semibold text-[#1e4e8c]">{j.role}</span> / {j.org}, {j.place}
              </h3>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-slate-400">
                {j.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-1 text-[11.5px]">
                <span className="font-semibold text-slate-900">Technologies:</span> {j.stack.join(' / ')}
              </p>
            </article>
          ))}
        </section>

        <section aria-labelledby="edu" className="break-inside-avoid-page">
          <H>
            <span id="edu">Education</span>
          </H>
          <ul className="space-y-0.5">
            {education.map((e) => (
              <li key={e.title}>
                <span className="font-semibold text-[#1e4e8c]">{e.title}</span> / {e.org}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ven" className="break-inside-avoid-page">
          <H>
            <span id="ven">Ventures &amp; open source</span>
          </H>
          <ul className="list-disc space-y-0.5 pl-4 marker:text-slate-400">
            {ventures.map((v) => (
              <li key={v.id}>
                <span className="font-semibold text-slate-900">
                  {v.name} ({v.role})
                </span>
                {v.url && <> (<a href={v.url}>{v.url.replace('https://', '')}</a>)</>}: {v.blurb}
              </li>
            ))}
            <li>
              <span className="font-semibold text-slate-900">
                {resume.openSource.name} ({resume.openSource.role})
              </span>
              : {resume.openSource.blurb}
            </li>
          </ul>
        </section>

        <section aria-labelledby="sk" className="break-inside-avoid-page">
          <H>
            <span id="sk">Skills</span>
          </H>
          <dl className="space-y-0.5">
            {resume.skills.map((s) => (
              <div key={s.label}>
                <dt className="inline font-semibold text-slate-900">{s.label}: </dt>
                <dd className="inline">{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}
