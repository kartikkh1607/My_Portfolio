// Phase 2 stand-in for the embedding map (CLAUDE.md §6). These dot positions
// are generated, not embeddings; Phase 3 replaces this file's SVG with
// public/map-static.svg and the R3F map built from real sentence embeddings.
import { mapChips } from '../data/portfolio.js'

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const CLUSTERS = [
  { color: 'var(--cobalt)', cx: 160, cy: 140, sd: 30, n: 26 },
  { color: 'var(--teal)', cx: 350, cy: 110, sd: 24, n: 16 },
  { color: 'var(--plum)', cx: 330, cy: 300, sd: 26, n: 18 },
  { color: 'var(--muted)', cx: 130, cy: 300, sd: 32, n: 18 },
]

const DOTS = (() => {
  const rand = rng(1607)
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand())
  return CLUSTERS.flatMap(({ color, cx, cy, sd, n }) =>
    Array.from({ length: n }, () => {
      const depth = rand()
      return {
        x: +(cx + gauss() * sd).toFixed(1),
        y: +(cy + gauss() * sd).toFixed(1),
        r: +(3 + depth * 5).toFixed(1),
        o: +(0.45 + depth * 0.5).toFixed(2),
        color,
      }
    }),
  )
})()

// Fit the viewBox to the dots so the cluster fills the frame.
const PAD = 16
const VIEWBOX = (() => {
  const xs = DOTS.map((d) => d.x), ys = DOTS.map((d) => d.y)
  const x0 = Math.min(...xs) - PAD, y0 = Math.min(...ys) - PAD
  return `${x0.toFixed(0)} ${y0.toFixed(0)} ${(Math.max(...xs) + PAD - x0).toFixed(0)} ${(Math.max(...ys) + PAD - y0).toFixed(0)}`
})()

export default function MapPlaceholder() {
  return (
    <figure className="flex flex-col gap-3" aria-labelledby="map-caption">
      <div className="h-[60vh] max-h-130 rounded-[14px] border border-dashed border-line-strong lg:h-auto lg:aspect-6/5">
        <svg viewBox={VIEWBOX} className="h-full w-full" aria-hidden="true" focusable="false">
          {DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.color} fillOpacity={d.o} />
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">Ask the map:</span>
        {mapChips.map((c) => (
          <button key={c.label} type="button" className="chip" disabled title="Available in Phase 3">
            {c.label}
          </button>
        ))}
      </div>
      <figcaption id="map-caption" className="text-sm text-muted">
        Placeholder. The interactive embedding map of my work arrives in Phase 3.
      </figcaption>
    </figure>
  )
}
