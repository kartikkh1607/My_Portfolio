import { useEffect, useMemo, useRef, useState } from 'react'
import MapTooltip, { clampX } from './MapTooltip.jsx'

// Fit the viewBox to the points (x right, y up) with a little padding.
function viewBoxFor(points) {
  const pad = 0.12
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => -p.y)
  const x0 = Math.min(...xs) - pad
  const y0 = Math.min(...ys) - pad
  const w = Math.max(...xs) + pad - x0
  const h = Math.max(...ys) + pad - y0
  return `${x0.toFixed(3)} ${y0.toFixed(3)} ${w.toFixed(3)} ${h.toFixed(3)}`
}

// 2D view of the embedding map: PCA components 1 and 2, the same projection as
// public/map-static.svg. Used for no-JS, reduced motion, no WebGL, and while the
// 3D chunk loads. Chips work here too.
export default function StaticMap({ points, highlight, tooltipIdx, onHover }) {
  const wrap = useRef(null)
  const [pos, setPos] = useState(null)
  const viewBox = useMemo(() => viewBoxFor(points), [points])

  useEffect(() => {
    if (tooltipIdx == null || !wrap.current) return setPos(null)
    const dot = wrap.current.querySelector(`[data-i="${tooltipIdx}"]`)
    if (!dot) return setPos(null)
    const a = wrap.current.getBoundingClientRect()
    const b = dot.getBoundingClientRect()
    setPos({ left: clampX(b.left + b.width / 2 - a.left, a.width), top: b.top - a.top })
  }, [tooltipIdx])

  return (
    <div ref={wrap} className="relative h-full w-full">
      <svg viewBox={viewBox} className="h-full w-full" aria-hidden="true" focusable="false">
        {points.map((p, i) => {
          const lit = !highlight || highlight.has(i)
          const big = (highlight && lit) || tooltipIdx === i
          return (
            <circle
              key={i}
              data-i={i}
              cx={p.x}
              cy={-p.y}
              r={big ? 0.052 : 0.032}
              fill={`var(--map-${p.cluster})`}
              fillOpacity={lit ? 0.9 : 0.25}
              onMouseEnter={() => onHover?.(i)}
              onMouseLeave={() => onHover?.(null)}
              onClick={() => onHover?.(i)}
            />
          )
        })}
      </svg>
      {pos && tooltipIdx != null && (
        <MapTooltip style={{ left: pos.left, top: pos.top }}>{points[tooltipIdx].text}</MapTooltip>
      )}
    </div>
  )
}
