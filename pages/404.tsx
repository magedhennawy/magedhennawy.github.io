import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found | Maged Hennawy</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow hud-tick">Signal lost · 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">This page is off the radar.</h1>
        <Link href="/" className="btn btn-primary mt-8">
          Return to base
        </Link>
      </main>
    </>
  );
}
