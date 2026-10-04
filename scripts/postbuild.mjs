// GitHub Pages can't set headers, so add a CSP <meta> to each exported page,
// with hashes for the inline scripts. (frame-ancestors doesn't work in a meta CSP.)
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../out/', import.meta.url));
const DATA_TYPES = /type=["'](application\/(ld\+)?json)["']/i;

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

let files = 0;
for await (const file of htmlFiles(OUT)) {
  let html = await readFile(file, 'utf8');
  const hashes = new Set();
  for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1] ?? '';
    const body = m[2];
    if (/\ssrc=/i.test(attrs) || DATA_TYPES.test(attrs) || !body.trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }

  const csp = [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].join(' ')}`.trim(),
    // next/font + inline styles
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/i, '');
  html = html.replace(/<head>/i, `<head><meta http-equiv="Content-Security-Policy" content="${csp}"/>`);
  await writeFile(file, html);
  files++;
  console.log(`csp: ${file.replace(OUT, 'out/')} (${hashes.size} inline script hash${hashes.size === 1 ? '' : 'es'})`);
}
if (!files) {
  console.error('postbuild: no HTML in out/. Did next build run?');
  process.exit(1);
}
