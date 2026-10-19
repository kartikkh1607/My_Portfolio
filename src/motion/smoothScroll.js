import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ORDER, onTick, setContinuous } from './ticker.js'

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lenis smooths wheel scrolling and in-page anchor jumps (it honors
// scroll-margin-top). Touch keeps native scrolling. It's driven by the shared
// ticker instead of its own rAF, so the 3D scene renders in the same frame.
// Off entirely with reduced motion.
export function startSmoothScroll() {
  if (reducedMotion()) return null
  const lenis = new Lenis({ autoRaf: false, anchors: true, stopInertiaOnNavigate: true })
  onTick((t) => lenis.raf(t), ORDER.scroll)
  setContinuous(true)
  return lenis
}
