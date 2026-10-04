// Prints /resume to public/Maged-Hennawy-Resume.pdf with headless Chrome.
// Usage: npm run resume (builds first). Set CHROME_PATH if needed.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { copyFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve.mjs';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const OUT_PDF = root('public/Maged-Hennawy-Resume.pdf');

const chrome =
  process.env.CHROME_PATH ??
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (!chrome) {
  console.error('resume-pdf: Chrome not found, set CHROME_PATH');
  process.exit(1);
}
if (!existsSync(root('out/resume.html'))) {
  console.error('resume-pdf: out/resume.html missing, run `npm run build` first');
  process.exit(1);
}

const port = 3900 + Math.floor(Math.random() * 90);
const server = startServer(port);
try {
  // must be async: the server runs in this process
  await promisify(execFile)(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=4000',
      `--print-to-pdf=${OUT_PDF}`,
      `http://localhost:${port}/resume`,
    ],
    { timeout: 60_000 },
  );
} finally {
  server.close();
}
copyFileSync(OUT_PDF, root('out/Maged-Hennawy-Resume.pdf'));
console.log(`resume-pdf: wrote public/Maged-Hennawy-Resume.pdf (${Math.round(statSync(OUT_PDF).size / 1024)} KB)`);
