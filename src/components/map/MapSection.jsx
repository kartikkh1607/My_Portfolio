import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import data from '../../data/embedding-map.json'
import { flagship, projects } from '../../data/portfolio.js'
import StaticMap from './StaticMap.jsx'

// three.js + R3F load in a separate chunk, only once the hero is on screen.
const EmbeddingMap = lazy(() => import('../../three/EmbeddingMap.jsx'))

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

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export default function MapSection() {
  const frame = useRef(null)
  // 'off': no WebGL, reduced motion or Save-Data -> SVG only
  // 'tap': touch or narrow screen -> SVG, plus a "View in 3D" button
  // 'idle': desktop -> 3D chunk loads after window load, when the browser is idle
  const [support, setSupport] = useState('off')
  const [want3d, setWant3d] = useState(false)
  const [seen, setSeen] = useState(false) // hero has been on screen at least once
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(null) // active chip label
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    const webgl = hasWebGL()
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compact = window.matchMedia('(pointer: coarse), (max-width: 767px)')
    const decide = () => {
      if (!webgl || motion.matches || navigator.connection?.saveData) {
        setSupport('off')
        setWant3d(false)
      } else {
        setSupport(compact.matches ? 'tap' : 'idle')
      }
    }
    decide()
    motion.addEventListener('change', decide)
    compact.addEventListener('change', decide)
    return () => {
      motion.removeEventListener('change', decide)
      compact.removeEventListener('change', decide)
    }
  }, [])

  // Desktop: request the 3D chunk only after the load event, in idle time,
  // so it never competes with the first paint or the hero's LCP.
  useEffect(() => {
    if (support !== 'idle') return
    let idle = null
    let timer = null
    const schedule = () => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(() => setWant3d(true), { timeout: 3000 })
      else timer = setTimeout(() => setWant3d(true), 1500)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.removeEventListener('load', schedule)
      if (idle !== null) window.cancelIdleCallback(idle)
      clearTimeout(timer)
    }
  }, [support])

  // Pause the render loop (frameloop="never") while the hero is off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setSeen(true)
      },
      { rootMargin: '100px' },
    )
    io.observe(frame.current)
    return () => io.disconnect()
  }, [])

  const show3d = support !== 'off' && want3d && seen

  const chip = chips.find((c) => c.label === active) ?? null
  const highlight = useMemo(() => (chip ? new Set(chip.top) : null), [chip])
  const order = chip ? chip.top : ALL
  const tooltipIdx = hovered ?? focused

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

  const props = { points, highlight, tooltipIdx, onHover: setHovered }

  return (
    <figure className="flex flex-col gap-3" aria-labelledby="map-caption">
      <div
        ref={frame}
        tabIndex={0}
        role="group"
        aria-label={`Embedding map of ${points.length} sentences about my work. Use the arrow keys to read them.`}
        aria-describedby="map-caption"
        onKeyDown={onKeyDown}
        onBlur={() => setFocused(null)}
        className="relative h-[60vh] max-h-130 rounded-[14px] lg:h-auto lg:aspect-6/5"
      >
        {show3d ? (
          <Suspense fallback={<StaticMap {...props} />}>
            <EmbeddingMap {...props} running={visible} />
          </Suspense>
        ) : (
          <StaticMap {...props} />
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {focused != null && `${points[focused].text} (${order.indexOf(focused) + 1} of ${order.length})`}
      </p>

      <div role="group" aria-label="Ask the map" className="js-only flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted" aria-hidden="true">Ask the map:</span>
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
        {support === 'tap' && (
          <button type="button" className="btn btn-secondary ml-auto min-h-9 py-1 text-sm" onClick={() => setWant3d((v) => !v)}>
            {want3d ? 'Show 2D' : 'View in 3D'}
          </button>
        )}
      </div>

      <div aria-live="polite" className="js-only lg:min-h-[6.5rem]">
        {!chip && (
          <p className="text-sm text-muted">Pick a topic to light up the 8 sentences nearest to it, ranked by cosine similarity.</p>
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
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: `var(--map-${key})` }} />
            {label}
          </li>
        ))}
      </ul>

      <figcaption id="map-caption" className="text-sm text-muted">
        Each dot is a sentence about my work, embedded with all-MiniLM-L6-v2 (the model behind YT Lecture RAG) and
        projected to 3D with PCA.
        <span className="mt-1 block text-xs">
          The 3D view keeps {VARIANCE_PCT}% of the variance, so it&rsquo;s a projection, not the full space.
        </span>
      </figcaption>
    </figure>
  )
}
