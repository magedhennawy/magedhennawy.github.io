// Favicons and og-image.png. Run with `npm run assets`; the output is committed.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url));

const ACCENT = '#5eead4';
const BG = '#05070d';

const monogram = (size, pad = 0) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}">
  <rect x="${pad}" y="${pad}" width="${32 - pad * 2}" height="${32 - pad * 2}" rx="${pad ? 6 : 7}" fill="${BG}"/>
  <rect x="${pad + 1}" y="${pad + 1}" width="${30 - pad * 2}" height="${30 - pad * 2}" rx="${pad ? 5 : 6}" fill="none" stroke="${ACCENT}" stroke-opacity=".45"/>
  <path d="M7 22V10l5 7 5-7v12M21 10v12M21 16h5M26 10v12" fill="none" stroke="${ACCENT}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

await writeFile(out('favicon.svg'), monogram(32).trim() + '\n');
await sharp(Buffer.from(monogram(32))).resize(32, 32).png().toFile(out('favicon-32.png'));
await sharp(Buffer.from(monogram(180, 0))).resize(180, 180).png().toFile(out('apple-touch-icon.png'));
await sharp(Buffer.from(monogram(192))).resize(192, 192).png().toFile(out('icon-192.png'));
await sharp(Buffer.from(monogram(512))).resize(512, 512).png().toFile(out('icon-512.png'));

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const cats = ['#60a5fa', '#a78bfa', '#34d399', '#fb7185', '#fbbf24'];
const cx = 900;
const cy = 330;
let stars = '';
for (let i = 0; i < 260; i++) {
  stars += `<circle cx="${(rnd() * 1200).toFixed(1)}" cy="${(rnd() * 630).toFixed(1)}" r="${(0.4 + rnd() ** 3 * 1.6).toFixed(2)}" fill="#c7d2fe" opacity="${(0.25 + rnd() * 0.5).toFixed(2)}"/>`;
}
let nodes = '';
let threads = '';
cats.forEach((c, k) => {
  const a = (k / 5) * Math.PI * 2 + 0.5;
  const gx = cx + Math.cos(a) * 210;
  const gy = cy + Math.sin(a) * 150;
  for (let j = 0; j < 9; j++) {
    const x = gx + (rnd() - 0.5) * 120;
    const y = gy + (rnd() - 0.5) * 90;
    if (j < 3) threads += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${cx}" y2="${cy}" stroke="${c}" stroke-opacity=".18"/>`;
    const r = 2 + rnd() * 3;
    nodes += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 3).toFixed(1)}" fill="url(#glow-${k})"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}"/>`;
  }
});
let orbits = '';
for (let i = 0; i < 4; i++) {
  orbits += `<ellipse cx="${cx}" cy="${cy}" rx="${80 + i * 26}" ry="${26 + i * 9}" fill="none" stroke="${ACCENT}" stroke-opacity=".22" transform="rotate(${-12 + i * 9} ${cx} ${cy})"/>`;
}
let rings = '';
for (let i = 1; i <= 6; i++) rings += `<circle cx="${cx}" cy="${cy}" r="${i * 60}" fill="none" stroke="${ACCENT}" stroke-opacity="${(0.12 - i * 0.012).toFixed(3)}"/>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="75%" cy="50%" r="70%"><stop offset="0" stop-color="#0d1a2a"/><stop offset="1" stop-color="${BG}"/></radialGradient>
    <radialGradient id="core" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#e0f2fe"/><stop offset=".35" stop-color="#7dd3fc" stop-opacity=".9"/><stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/></radialGradient>
    ${cats.map((c, k) => `<radialGradient id="glow-${k}"><stop offset="0" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')}
    <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="${BG}" stop-opacity=".95"/><stop offset=".5" stop-color="${BG}" stop-opacity=".6"/><stop offset="1" stop-color="${BG}" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  ${stars}${rings}${threads}${orbits}${nodes}
  <circle cx="${cx}" cy="${cy}" r="110" fill="url(#core)"/>
  <circle cx="${cx}" cy="${cy}" r="42" fill="none" stroke="#7dd3fc" stroke-width="2"/>
  <rect width="700" height="630" fill="url(#fade)"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="72" y="150" fill="${ACCENT}" font-family="Menlo, monospace" font-size="20" letter-spacing="4">● LEAD FULL-STACK &amp; PLATFORM ENGINEER</text>
    <text x="68" y="262" fill="#e6edf6" font-size="104" font-weight="600" letter-spacing="-3">Maged</text>
    <text x="68" y="364" fill="#e6edf6" font-size="104" font-weight="600" letter-spacing="-3">Hennawy</text>
    <text x="72" y="430" fill="#9aa7ba" font-size="28">I build the platform a fleet of applications runs on.</text>
    <text x="72" y="530" fill="#e6edf6" font-family="Menlo, monospace" font-size="22">8 yrs  ·  ~10 apps on RAP  ·  AWS Bedrock AI  ·  IBM · RBC · RCAF</text>
    <text x="72" y="572" fill="#9aa7ba" font-family="Menlo, monospace" font-size="18">magedhennawy.github.io</text>
  </g>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('og-image.png'));

console.log('assets written');
