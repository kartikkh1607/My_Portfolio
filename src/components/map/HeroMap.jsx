import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import data from '../../data/embedding-map.json'
import { flagship, projects } from '../../data/portfolio.js'
import { scene, subscribeStatus } from '../../motion/bridge.js'
import { docBox } from '../../motion/layout.js'
import { requestTick } from '../../motion/ticker.js'
import { svgScreen } from './layout.js'
import MapTooltip, { clampX } from './MapTooltip.jsx'

const { points, chips, meta } = data
// Share of the embeddings' variance the 3 PCA axes keep (21% today).
const VARIANCE_PCT = Math.round(meta.pca_explained_variance.reduce((a, b) => a + b, 0) * 100)

const PROJECT_NAMES = {
  [flagship.id]: flagship.name,
  ...Object.fromEntries(projects.map((p) => [p.id, p.name])),
  'earlier-work': 'Earlier Android work',
}

const LEGEND = [
  ['rag', 'RAG'],
  ['evals', 'evals'],
  ['llm-apps', 'LLM apps'],
  ['android', 'Android'],
  ['infra', 'infra'],
  ['testing', 'testing'],
  ['dsa', 'DSA'],
]

const ALL = points.map((_, i) => i)
const STEP = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

// No layout effects on the server (prerender); same timing in the browser.
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const useStatus = () =>
  useSyncExternalStore(subscribeStatus, () => scene.status, () => 'static')

// Nearest point to (x, y) in frame pixels, within `radius`.
function hitTest(x, y, radius) {
  let best = null
  let bestD = radius * radius
  for (let i = 0; i < points.length; i++) {
    const dx = scene.screen[2 * i] - x
    const dy = scene.screen[2 * i + 1] - y
    const d = dx * dx + dy * dy
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  return best
}

// The hero's embedding map. The 3D points are drawn by the fixed background
// canvas, fitted to this frame; the frame itself only handles input. Until
// the 3D loads (and without JS or WebGL) the frame shows map-static.svg,
// which has the same layout as the 3D map's first frame.
export default function HeroMap() {
  const frame = useRef(null)
  const tip = useRef(null)
  const drag = useRef(null)
  const live = useStatus() === 'live'
  const [active, setActive] = useState(null) // active chip label
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [grabbing, setGrabbing] = useState(false)
  const [canDrag, setCanDrag] = useState(false)

  const chip = chips.find((c) => c.label === active) ?? null
  const order = chip ? chip.top : ALL
  const tooltipIdx = hovered ?? focused

  useEffect(() => {
    scene.frame = frame.current
    scene.tooltip = tip.current
    setCanDrag(scene.finePointer)
    return () => {
      scene.frame = null
      scene.tooltip = null
    }
  }, [])

  useEffect(() => {
    scene.chip = chip
    requestTick()
  }, [chip])

  useEffect(() => {
    scene.hover = tooltipIdx
    requestTick()
  }, [tooltipIdx])

  // Static mode: hit-test against the SVG layout.
  useEffect(() => {
    if (live) return
    const update = () => {
      const r = frame.current.getBoundingClientRect()
      svgScreen(points, r.width, r.height, scene.screen)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [live])

  // Static mode positions the tooltip here; once live the scene does it every frame.
  useBrowserLayoutEffect(() => {
    const el = tip.current
    if (live) return
    if (tooltipIdx == null) {
      el.style.visibility = 'hidden'
      return
    }
    const w = frame.current.getBoundingClientRect().width
    el.style.left = `${clampX(scene.screen[2 * tooltipIdx], w)}px`
    el.style.top = `${scene.screen[2 * tooltipIdx + 1] - 8}px`
    el.style.visibility = 'visible'
  }, [tooltipIdx, live])

  const toggleChip = (label) => {
    setActive((cur) => (cur === label ? null : label))
    setFocused(null)
  }

  // One tab stop for the whole map; arrow keys walk the sentences
  // (only the highlighted ones while a chip is active).
  const onKeyDown = (e) => {
    if (e.key === 'Escape') return setFocused(null)
    const step = STEP[e.key]
    if (!step) return
    e.preventDefault()
    const at = order.indexOf(focused)
    const next = at === -1 ? (step > 0 ? 0 : order.length - 1) : (at + step + order.length) % order.length
    setFocused(order[next])
  }

  const local = (e) => {
    const r = docBox(frame.current)
    return [e.clientX - r.left + window.scrollX, e.clientY - r.top + window.scrollY]
  }

  // Mouse: drag rotates the 3D map, hover shows a sentence.
  // Touch: no drag (the page must keep scrolling); a tap shows a sentence.
  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, moved: 0 }
    if (e.pointerType === 'mouse' && live && e.button === 0) {
      frame.current.setPointerCapture(e.pointerId)
      scene.dragging = true
    }
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (d && scene.dragging) {
      const dx = e.clientX - d.x
      const dy = e.clientY - d.y
      d.x = e.clientX
      d.y = e.clientY
      d.moved += Math.abs(dx) + Math.abs(dy)
      scene.dragX += dx
      scene.dragY += dy
      if (d.moved > 4) {
        setGrabbing(true)
        setHovered(null)
      }
      requestTick()
      return
    }
    if (e.pointerType === 'mouse') setHovered(hitTest(...local(e), 16))
  }

  const onPointerUp = (e) => {
    const d = drag.current
    drag.current = null
    scene.dragging = false
    setGrabbing(false)
    if (!d || d.moved > 6) return
    if (e.pointerType !== 'mouse') setHovered(hitTest(...local(e), 26))
  }

  return (
    <figure className="flex flex-col gap-4" aria-labelledby="map-caption">
      <div
        ref={frame}
        tabIndex={0}
        role="group"
        aria-label={`Embedding map of ${points.length} sentences about my work. Use the arrow keys to read them.`}
        aria-describedby="map-caption"
        onKeyDown={onKeyDown}
        onBlur={() => setFocused(null)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={(e) => e.pointerType === 'mouse' && !scene.dragging && setHovered(null)}
        className="relative h-[min(62vh,26rem)] select-none rounded-[20px] sm:h-[30rem] lg:-mr-6 lg:h-[min(68vh,36rem)] xl:-mr-16"
        style={{ cursor: canDrag && live ? (grabbing ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          src="/map-static.svg"
          alt=""
          width="600"
          height="595"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
          style={{ opacity: live ? 0 : 1 }}
        />
        <MapTooltip ref={tip} style={{ visibility: 'hidden', left: 0, top: 0 }}>
          {tooltipIdx != null ? points[tooltipIdx].text : ''}
        </MapTooltip>
        {canDrag && live && (
          <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-muted">Drag to rotate</span>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {focused != null && `${points[focused].text} (${order.indexOf(focused) + 1} of ${order.length})`}
      </p>

      <div role="group" aria-label="Ask the map" className="js-only flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-muted" aria-hidden="true">Ask the map:</span>
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            className="chip chip-button"
            aria-pressed={active === c.label}
            title={`Highlight the 8 sentences nearest to "${c.query}"`}
            onClick={() => toggleChip(c.label)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="js-only min-h-[6.5rem]">
        {!chip && (
          <p className="text-sm text-muted">
            Pick a topic: a query beam lights up the 8 sentences nearest to it, ranked by cosine similarity.
          </p>
        )}
        {chip && (
          <div className="text-sm">
            <p className="text-muted">Nearest sentences to &ldquo;{chip.query}&rdquo;:</p>
            <ol className="mt-1 grid gap-1 pl-5 [list-style:decimal] marker:text-muted">
              {chip.top.slice(0, 3).map((i) => (
                <li key={i}>
                  {points[i].text}
                  {points[i].project && (
                    <>
                      {' '}
                      <a href={`#${points[i].project}`} className="whitespace-nowrap">
                        {PROJECT_NAMES[points[i].project]}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted" aria-label="Cluster colors">
        {LEGEND.map(([key, label]) => (
          <li key={key} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: `var(--map-${key})`, boxShadow: `0 0 8px var(--map-${key})` }}
            />
            {label}
          </li>
        ))}
      </ul>

      <figcaption id="map-caption" className="text-sm text-muted">
        Each bright dot is a sentence about my work, embedded with all-MiniLM-L6-v2 (the model behind YT Lecture
        RAG) and projected to 3D with PCA. The faint field around them is decoration.
        <span className="mt-1 block text-xs">
          The 3D view keeps {VARIANCE_PCT}% of the variance, so it&rsquo;s a projection, not the full space.
        </span>
      </figcaption>
    </figure>
  )
}
