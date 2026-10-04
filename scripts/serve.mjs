// Static server for out/ (npm start). Also used by resume-pdf.mjs.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../out/', import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
};

export function startServer(port) {
  return createServer(async (req, res) => {
  let url;
  try {
    url = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
  } catch {
    return res.writeHead(400).end('bad request');
  }
  let file = normalize(join(ROOT, url));
  if (!file.startsWith(ROOT)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch {
    file = (await stat(file + '.html').catch(() => null)) ? file + '.html' : join(ROOT, '404.html');
    if (file.endsWith('404.html')) res.statusCode = 404;
  }
  try {
    let body = await readFile(file);
    const type = TYPES[extname(file)] ?? 'application/octet-stream';
    res.setHeader('Content-Type', type);
    // gzip + cache headers, roughly like GitHub Pages
    if (url.startsWith('/_next/static/')) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    else res.setHeader('Cache-Control', 'no-cache');
    if (/text|javascript|json|xml|svg|manifest/.test(type) && /gzip/.test(String(req.headers['accept-encoding']))) {
      body = gzipSync(body);
      res.setHeader('Content-Encoding', 'gzip');
    }
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
  }).listen(port);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.argv[2] ?? 3124);
  startServer(port).on('listening', () => console.log(`serving out/ on http://localhost:${port}`));
}
