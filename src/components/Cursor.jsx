import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ringRef  = useRef(null)
  const posRef   = useRef({ x: -100, y: -100 })
  const ringPos  = useRef({ x: -100, y: -100 })
  const glowRef  = useRef(null)
  const rafRef   = useRef(null)

  useEffect(() => {
    // Only on non-touch desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ring = ringRef.current
    const glow = glowRef.current
    if (!ring || !glow) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      // Glow snaps close to cursor
      glow.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 80}px)`
    }

    // Smooth trailing ring
    const animate = () => {
      const dx = posRef.current.x - ringPos.current.x
      const dy = posRef.current.y - ringPos.current.y
      ringPos.current.x += dx * 0.12
      ringPos.current.y += dy * 0.12
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Scale up ring on hover over interactive elements
    const onEnter = (e) => {
      if (e.target.matches('a, button, [data-cursor-hover]')) {
        ring.style.width       = '50px'
        ring.style.height      = '50px'
        ring.style.borderColor = 'rgba(45,212,191,0.6)'
        ring.style.background  = 'rgba(45,212,191,0.04)'
      }
    }
    const onLeave = () => {
      ring.style.width       = '40px'
      ring.style.height      = '40px'
      ring.style.borderColor = 'rgba(45,212,191,0.35)'
      ring.style.background  = 'transparent'
    }

    document.addEventListener('mousemove', onMove,  { passive: true })
    document.addEventListener('mouseover', onEnter, { passive: true })
    document.addEventListener('mouseout',  onLeave, { passive: true })

    // Keep the default cursor visible — only the ring trails behind
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout',  onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Soft glow orb — trails behind cursor */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width:        '160px',
          height:       '160px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(45,212,191,0.07), transparent 70%)',
          filter:       'blur(20px)',
        }}
      />
      {/* Smooth trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width:        '40px',
          height:       '40px',
          borderRadius: '50%',
          border:       '1px solid rgba(45,212,191,0.35)',
          transition:   'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s',
        }}
      />
    </>
  )
}
