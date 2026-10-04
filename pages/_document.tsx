import { Head, Html, Main, NextScript } from 'next/document';
import { jsonLd, seo } from '@/lib/seo';
import { person } from '@/data/profile';

// Sets the theme before first paint. Its hash goes into the CSP (scripts/postbuild.mjs).
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function Document() {
  return (
    <Html lang="en-CA" data-theme="dark">
      <Head>
        <meta name="description" content={seo.description} />
        <meta name="author" content={person.name} />
        <meta name="color-scheme" content="dark light" />
        <meta name="theme-color" content="#05070d" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f4f6f9" media="(prefers-color-scheme: light)" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="canonical" href={seo.url} />

        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content={person.name} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.url} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${person.name}, ${person.title}`} />
        <meta property="og:locale" content="en_CA" />
        <meta property="profile:first_name" content="Maged" />
        <meta property="profile:last_name" content="Hennawy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
