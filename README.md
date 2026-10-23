# Kartik Khandelwal: portfolio

One-page portfolio for a GenAI / Applied AI Engineer internship search. The hero is an embedding map: every dot is a sentence about my work, embedded with all-MiniLM-L6-v2 (the model behind YT Lecture RAG) and projected to 3D with PCA. The query chips highlight the nearest sentences by cosine similarity, the same way retrieval works.

Live: https://my-portfolio-azure-nine-26.vercel.app/

## Stack

React 18, Vite 5, Tailwind CSS v4, @react-three/fiber + drei (lazy-loaded), EmailJS. Fonts are self-hosted with @fontsource (Bricolage Grotesque, IBM Plex Sans).

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
3. `scripts/prerender.mjs`: renders the page to HTML and injects it into `dist/index.html`, so crawlers, link previews and no-JS visitors get the full content (with the 2D SVG map). The client then hydrates it.
4. `scripts/check-bundle.mjs`: fails if the main entry chunk is over 80 kB gzipped.

The 3D map (three.js + R3F, ~225 kB gzipped) is a separate lazy chunk. Desktop loads it after the window load event in idle time; touch and narrow screens show the SVG map and load 3D only on "View in 3D". Reduced motion, Save-Data or no WebGL keep the SVG.

## Content

All copy lives in `src/data/portfolio.js`.

## Rebuilding the embedding map

```sh
uv run scripts/map/build_map.py
```

Reads `scripts/map/sentences.yaml`, embeds each sentence with fastembed (`sentence-transformers/all-MiniLM-L6-v2`), runs PCA to 3D, precomputes each chip's top-8 neighbours in the full 384-d space, and writes `src/data/embedding-map.json` and `public/map-static.svg`. Offline after the first model download; no API keys.

## Social preview and icons

```sh
node scripts/og/render.mjs   # set CHROME_PATH if Chrome isn't found
```

Renders `public/og.png` (1200×630) from `scripts/og/og.html`, plus `favicon-32.png` and `apple-touch-icon.png` from `public/favicon.svg`.

## Environment

The contact form needs EmailJS public keys at build time. Copy `.env.example` to `.env` locally, and set the same `VITE_EMAILJS_*` variables in Vercel. Without them the form is hidden and the email and LinkedIn links remain.
