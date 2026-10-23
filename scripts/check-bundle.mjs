// Fails the build if the main entry chunk (the JS every visitor downloads
// before the page is interactive) grows past 80 kB gzipped.
//
// The lazy EmbeddingMap chunk (three.js + R3F, ~225 kB gzip) is deliberately
// not counted: it loads after the window load event on desktop and only on a
// "View in 3D" tap on touch/narrow screens, so it never blocks first paint.
// See the comment in vite.config.js.
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

const LIMIT_KB = 80
const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const html = readFileSync(join(dist, 'index.html'), 'utf8')
const src = html.match(/<script type="module"[^>]*src="\/([^"]+\.js)"/)?.[1]

if (!src) {
  console.error('check-bundle: no module entry script found in dist/index.html')
  process.exit(1)
}

const gz = gzipSync(readFileSync(join(dist, src)), { level: 9 }).length / 1024
const msg = `check-bundle: ${src} is ${gz.toFixed(1)} kB gzipped (limit ${LIMIT_KB} kB)`
if (gz > LIMIT_KB) {
  console.error(`${msg}. Move heavy code behind a dynamic import().`)
  process.exit(1)
}
console.log(msg)
