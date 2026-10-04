# magedhennawy.github.io

Personal site of Maged Hennawy: https://magedhennawy.github.io

Next.js (static export) + React + Tailwind, with a react-three-fiber scene behind the page:

- **Hero:** a single GLSL fragment shader on plain WebGL2, so the first screen doesn't wait on three.js.
- **Scene:** the RAP platform as a core with its apps in orbit, skills grouped by discipline and linked to the work that used them, past roles along a flight path, and side projects as separate systems. Scrolling moves the camera between sections.
- **Skills:** on the skills section the skill nodes turn into a grid of towers (height = level).
- **HTML:** all content is normal HTML. Every node in the scene has a matching button in the page, so the site works without WebGL, with the keyboard and with a screen reader.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to out/, then adds the CSP meta tag
npm start            # serves out/ on http://localhost:3124
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run assets` (favicons + `og-image.png`), `npm run resume` (rebuilds and prints `/resume` to `public/Maged-Hennawy-Resume.pdf` with headless Chrome; commit the PDF).

## Layout

```
data/profile.ts            all site content (page, scene, résumé, JSON-LD)
lib/layout.ts              scene positions, orbits, camera keyframes per section
lib/store.ts               state shared between the page and the scene
components/ShaderHero.tsx  hero shader
components/SceneLayer.tsx  lazy-loads the scene, maps scroll position to the camera
components/scene/          the r3f scene
components/nodes.tsx       details card + node buttons
pages/resume.tsx           printable résumé
scripts/                   CSP post-build step, asset + PDF generation, local static server
```

## Notes

- First load is about 100 KB of JS (gzip). The 3D bundle (~226 KB gzip, mostly three.js) loads on the first scroll/click/keypress or after ~4 s.
- With `prefers-reduced-motion` or Save-Data the 3D starts switched off; `?motion=reduced` forces this for testing.
- Without WebGL2 an SVG version is shown instead.
- GitHub Pages can't send headers, so the CSP is a `<meta>` tag added by `scripts/postbuild.mjs`.
- Deployed by `.github/workflows/nextjs.yml` on pushes to `react-version`.
- Defence work is described generically. No phone number or address on the site.
