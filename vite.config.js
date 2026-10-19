import { createLogger, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const CHUNK_LIMIT_KB = 500 // Vite's default chunkSizeWarningLimit

// The lazy Scene chunk (the 3D background) is three.js + @react-three/fiber
// (~800 kB min, ~220 kB gzip). R3F v8 registers the whole THREE namespace and
// three r167 is a single module, so it can't be tree-shaken or split below
// 500 kB. It is allowed to be large because it never blocks first paint: it
// loads after the window load event, in idle time. The main entry is guarded
// by scripts/check-bundle.mjs.
//
// Vite's built-in size warning doesn't say which chunk tripped it, so we drop
// that one generic message and re-apply the same 500 kB limit here to every
// chunk except Scene. Any other oversized chunk still warns.
const LAZY_MAP_CHUNK = /^Scene/

function chunkSizeGuard() {
  return {
    name: 'chunk-size-guard',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || LAZY_MAP_CHUNK.test(chunk.name)) continue
        const kb = chunk.code.length / 1000
        if (kb > CHUNK_LIMIT_KB) this.warn(`${chunk.fileName} is ${kb.toFixed(0)} kB, over the ${CHUNK_LIMIT_KB} kB limit`)
      }
    },
  }
}

const logger = createLogger()
const warn = logger.warn
logger.warn = (msg, options) => {
  if (msg.includes('Some chunks are larger than')) return
  warn(msg, options)
}

export default defineConfig({
  customLogger: logger,
  plugins: [react(), tailwindcss(), chunkSizeGuard()],
})
