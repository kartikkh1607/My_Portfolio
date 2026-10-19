import { useEffect, useRef } from 'react'

// Hover effects for mouse/trackpad users who allow motion.
const canHover = () =>
  window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Subtle 3D tilt toward the cursor, plus --mx/--my for the .glow-hover light.
// Uses the `rotate` property, not `transform`, so it composes with Framer
// Motion's reveal transform on the same element. The parent sets perspective.
export function useTilt(max = 3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !canHover()) return
    el.style.transition = 'rotate 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      const rx = (0.5 - y) * max
      const ry = (x - 0.5) * max
      const angle = Math.hypot(rx, ry)
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      el.style.rotate = angle > 0.01 ? `${(rx / angle).toFixed(3)} ${(ry / angle).toFixed(3)} 0 ${angle.toFixed(2)}deg` : ''
    }
    const leave = () => {
      el.style.rotate = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      el.style.rotate = ''
    }
  }, [max])
  return ref
}

// Magnetic button: drifts toward the cursor while hovered, springs back on leave.
export function useMagnetic(strength = 0.3, limit = 10) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !canHover()) return
    const clamp = (v) => Math.max(-limit, Math.min(limit, v))
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = clamp((e.clientX - (r.left + r.width / 2)) * strength)
      const dy = clamp((e.clientY - (r.top + r.height / 2)) * strength)
      el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
    }
    const leave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength, limit])
  return ref
}
