import { Component, lazy, Suspense, useEffect, useState } from 'react'
import { scene, setStatus } from '../motion/bridge.js'
import { docBox } from '../motion/layout.js'
import { requestTick } from '../motion/ticker.js'

// three.js + R3F load in a separate chunk after the page has painted.
const Scene = lazy(() => import('../three/Scene.jsx'))

// If WebGL can't start (blocked, lost, too old), keep the static SVG.
// There's no up-front probe: creating a throwaway WebGL context costs as
// much main-thread time as the real one.
class Fallback extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error) {
    console.warn('3D background disabled:', error?.message ?? error)
    setStatus('static')
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// The block crossing the middle of the viewport drives the camera.
// Blocks are marked with data-scene; in a gap between two, the last one holds.
function trackFocus() {
  const blocks = [...document.querySelectorAll('[data-scene]')]
  const update = () => {
    const mid = window.innerHeight / 2
    let best = null
    let bestH = Infinity
    const y = window.scrollY + mid
    for (const el of blocks) {
      const r = docBox(el)
      if (r.top <= y && r.top + r.height >= y && r.height < bestH) {
        best = el
        bestH = r.height
      }
    }
    if (best) scene.focus = best.dataset.scene
  }
  const onScroll = () => {
    update()
    if (scene.reduced) requestTick()
  }
  const onResize = () => {
    update()
    requestTick()
    setTimeout(requestTick, 150) // after R3F's debounced resize
  }
  const onPointer = (e) => {
    if (e.pointerType !== 'mouse') return
    scene.pointerX = (e.clientX / window.innerWidth) * 2 - 1
    scene.pointerY = (e.clientY / window.innerHeight) * 2 - 1
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointer, { passive: true })
  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointer)
  }
}

// Fixed layer behind every section: night-sky gradient, the 3D latent space
// once it has loaded, and a vignette that keeps text readable at the edges.
export default function Background() {
  const [load, setLoad] = useState(false)

  useEffect(() => trackFocus(), [])

  // Request the 3D chunk after the load event, in idle time, so it never
  // competes with the first paint. Save-Data and no-WebGL keep the SVG.
  useEffect(() => {
    if (!('WebGLRenderingContext' in window) || navigator.connection?.saveData) return
    let idle = null
    let timer = null
    const go = () => setLoad(true)
    const schedule = () => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(go, { timeout: 2500 })
      else timer = setTimeout(go, 1200)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.removeEventListener('load', schedule)
      if (idle !== null) window.cancelIdleCallback(idle)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh">
      <div className="sky absolute inset-0" />
      {load && (
        <Fallback>
          <Suspense fallback={null}>
            <div className="absolute inset-0">
              <Scene />
            </div>
          </Suspense>
        </Fallback>
      )}
      <div className="veil absolute inset-0" />
    </div>
  )
}
