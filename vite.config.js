import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The lazy EmbeddingMap chunk is three.js + @react-three/fiber (~830 kB min,
    // ~225 kB gzip). R3F v8 registers the whole THREE namespace, so it can't be
    // tree-shaken further. It loads only after the hero is on screen, never on
    // the critical path. The main bundle stays far below this limit.
    chunkSizeWarningLimit: 850,
  },
})
