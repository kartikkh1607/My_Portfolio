import { useEffect, useRef } from 'react'

const NUMBER = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/

function parse(value) {
  const match = String(value).match(NUMBER)
  if (!match) return null
  const [, prefix, num, suffix] = match
  return { prefix, num: Number(num), decimals: (num.split('.')[1] ?? '').length, suffix }
}

const easeOut = (t) => 1 - (1 - t) ** 4

// Counts a metric up from `from` the first time it scrolls into view.
// The HTML (and screen readers) always get the final value; the counting
// copy is aria-hidden. Skipped with reduced motion, or if the number is
// already on screen when the page loads. A "~" prefix is set in the body
// font: the display font draws it as a dot.
export default function CountUp({ value, from = 0, delay = 0, duration = 1.4 }) {
  const ref = useRef(null)
  const v = parse(value)

  useEffect(() => {
    const el = ref.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return

    const start = Math.min(from, v.num)
    const final = v.num.toFixed(v.decimals)
    const format = (n) => n.toFixed(v.decimals)
    el.textContent = format(start)

    let raf = 0
    let timer = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = setTimeout(() => {
          const t0 = performance.now()
          const step = (now) => {
            const t = Math.min((now - t0) / (duration * 1000), 1)
            el.textContent = t < 1 ? format(start + (v.num - start) * easeOut(t)) : final
            if (t < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
        }, delay * 1000)
      },
      { threshold: 0.8 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      el.textContent = final
    }
  }, [value, from, delay, duration]) // v is derived from value

  if (!v) return value
  return (
    <>
      <span aria-hidden="true">
        {v.prefix && <span className={v.prefix.includes('~') ? 'font-sans font-medium' : undefined}>{v.prefix}</span>}
        <span ref={ref}>{v.num.toFixed(v.decimals)}</span>
        {v.suffix}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}
