import { useEffect, useRef } from 'react'
import { scrollMax } from '../motion/layout.js'

// Thin bar along the top edge showing how far down the page you are.
export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    const el = bar.current
    const update = () => {
      const p = window.scrollY / scrollMax()
      el.style.transform = `scaleX(${Math.min(Math.max(p, 0), 1)})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div aria-hidden="true" className="js-only pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-violet to-cyan shadow-[0_0_12px_rgba(34,211,238,0.7)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
