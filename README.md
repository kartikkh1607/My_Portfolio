# Kartik Khandelwal: portfolio

One-page portfolio for a GenAI / Applied AI Engineer internship search. The whole page sits on a 3D "latent space": the embedding map, where every bright dot is a sentence about my work, embedded with all-MiniLM-L6-v2 (the model behind YT Lecture RAG) and projected to 3D with PCA, inside a field of decorative drifting points. In the hero you can rotate the map and ask it a question: the chips fire a query beam to the 8 nearest sentences by cosine similarity, the same way retrieval works. Scrolling flies the camera through the space; each project lights up its cluster and runs its own query beams.

Live: https://my-portfolio-azure-nine-26.vercel.app/

## Stack

React 18, Vite 5, Tailwind CSS v4, @react-three/fiber (lazy-loaded), Framer Motion (scroll reveals), Lenis (smooth scrolling), EmailJS. Fonts are self-hosted with @fontsource (Syne, DM Sans).

One requestAnimationFrame loop (`src/motion/ticker.js`) drives Lenis, then the R3F canvas (`frameloop="never"` + `advance()`), then DOM readers, so the 3D always renders at the scroll position Lenis just set.

## Commands

```sh
npm install
npm run dev       # local dev server
npm run build     # client build, SSR build, prerender, bundle-size check
npm run preview   # serve dist/
```

`npm run build` runs four steps:

1. `vite build`: the client bundle.
2. `vite build --ssr src/entry-server.jsx`: a server build of the same app.
3. `scripts/prerender.mjs`: renders the page to HTML and injects it into `dist/index.html`, so crawlers, link previews and no-JS visitors get the full content (with `public/map-static.svg` in place of the 3D map). The client then hydrates it.
4. `scripts/check-bundle.mjs`: fails if the main entry chunk is over 80 kB gzipped.

The 3D background (three.js + R3F, ~225 kB gzipped) is a separate lazy chunk, loaded on every device after the window load event in idle time; until then the hero shows `map-static.svg`, which has the same layout as the 3D map's first frame. Phones get fewer points (~1,500 vs ~5,000) and DPR ≤ 1.5, and no drag-to-rotate so the page still scrolls. Rendering stops while the tab is hidden. Reduced motion renders a still frame (no drift, camera flight, smooth scrolling or count-ups). Save-Data or no WebGL keep the SVG.

## Content

All copy lives in `src/data/portfolio.js`.

## Rebuilding the embedding map

```sh
uv run scripts/map/build_map.py
```

Reads `scripts/map/sentences.yaml`, embeds each sentence with fastembed (`sentence-transformers/all-MiniLM-L6-v2`), runs PCA to 3D, precomputes the top-8 neighbours of each chip query and each project query in the full 384-d space (and the query's own 3D position, where the beams start), and writes `src/data/embedding-map.json` and `public/map-static.svg`. Offline after the first model download; no API keys.

## Social preview and icons

```sh
node scripts/og/render.mjs   # set CHROME_PATH if Chrome isn't found
```

Renders `public/og.png` (1200×630) from `scripts/og/og.html`, plus `favicon-32.png` and `apple-touch-icon.png` from `public/favicon.svg`.

## Environment

The contact form needs EmailJS public keys at build time. Copy `.env.example` to `.env` locally, and set the same `VITE_EMAILJS_*` variables in Vercel. Without them the form is hidden and the email and LinkedIn links remain.
