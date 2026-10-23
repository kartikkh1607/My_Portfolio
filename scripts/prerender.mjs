// Runs after `vite build` and `vite build --ssr src/entry-server.jsx`:
// renders the app to HTML and injects it into dist/index.html at <!--app-html-->.
// Also preloads the two fonts the hero paints with, so the LCP text doesn't
// wait on CSS discovery.
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist`
const ssrDir = `${root}dist-ssr`

const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href)
const appHtml = render()

const template = readFileSync(`${dist}/index.html`, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('prerender: <!--app-html--> placeholder missing')

const assets = readdirSync(`${dist}/assets`)
const preloads = [
  'syne-latin-800-normal', // hero name
  'dm-sans-latin-400-normal', // body text
]
  .map((name) => assets.find((f) => f.startsWith(name) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')

const html = template
  .replace('<!--app-html-->', appHtml)
  .replace('<!--font-preloads-->', preloads)
writeFileSync(`${dist}/index.html`, html)
rmSync(ssrDir, { recursive: true, force: true })

const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
console.log(`prerender: dist/index.html ${kb} kB, ${preloads ? preloads.split('\n').length : 0} font preloads`)
