import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ORDER, onTick } from './ticker.js'

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lenis smooths wheel scrolling and in-page anchor jumps (it honors
// scroll-margin-top). It's driven by the shared ticker instead of its own rAF,
// so the 3D scene renders in the same frame. Off with reduced motion, and on
// touch-only devices, where it wouldn't smooth anything (touch scrolling stays
// native) and native momentum scrolling is left completely alone.
export function startSmoothScroll() {
  if (reducedMotion() || window.matchMedia('(hover: none) and (pointer: coarse)').matches) return null
  const lenis = new Lenis({ autoRaf: false, anchors: true, stopInertiaOnNavigate: true })
  onTick((t) => lenis.raf(t), ORDER.scroll)
  return lenis
}
