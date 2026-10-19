import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/syne/latin-600.css'
import '@fontsource/syne/latin-700.css'
import '@fontsource/syne/latin-800.css'
import App from './App.jsx'
import { scene } from './motion/bridge.js'
import { reducedMotion, startSmoothScroll } from './motion/smoothScroll.js'
import { startLayoutWatch } from './motion/layout.js'
import { startTicker } from './motion/ticker.js'
import './styles/index.css'

scene.reduced = reducedMotion()
scene.finePointer = window.matchMedia('(pointer: fine)').matches
scene.compact = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches

startTicker()
startLayoutWatch()
startSmoothScroll()

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it.
// `npm run dev` serves the bare template, so render from scratch there.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
