import { forwardRef } from 'react'

const MAX_W = 256 // matches max-w-[16rem]
const PAD = 8

// Keep the tooltip's center far enough from the frame edges that it never
// spills outside the map (which would cause horizontal scroll on mobile).
export function clampX(x, frameWidth) {
  const half = Math.min(MAX_W, frameWidth - 2 * PAD) / 2
  return Math.min(Math.max(x, half + PAD), frameWidth - half - PAD)
}

// Sentence tooltip over the map, anchored above a point. Positioned by
// HeroMap (static SVG) or by the 3D scene every frame.
const MapTooltip = forwardRef(function MapTooltip({ children, style }, ref) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute z-10 w-max max-w-[min(16rem,calc(100%-16px))] -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-[rgba(7,17,31,0.92)] px-3 py-2 text-sm leading-snug text-ink shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]"
      style={style}
    >
      {children}
    </div>
  )
})

export default MapTooltip
