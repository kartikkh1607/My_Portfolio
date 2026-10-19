import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import data from '../../data/embedding-map.json'
import { flagship, projects } from '../../data/portfolio.js'
import StaticMap from './StaticMap.jsx'

// three.js + R3F load in a separate chunk, only once the hero is on screen.
const EmbeddingMap = lazy(() => import('../../three/EmbeddingMap.jsx'))

const { points, chips } = data

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
  const [mode, setMode] = useState('static') // 'static' until we know 3D is OK
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(null) // active chip label
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)

  // 3D only with WebGL, without reduced motion or Save-Data, and once visible.
  // Off-screen, the render loop pauses (frameloop="never").
  useEffect(() => {
    if (navigator.connection?.saveData || !hasWebGL()) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let io = null
    const decide = () => {
      io?.disconnect()
      if (motion.matches) return setMode('static')
      io = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting)
          if (entry.isIntersecting) setMode('3d')
        },
        { rootMargin: '100px' },
      )
      io.observe(frame.current)
    }
    decide()
    motion.addEventListener('change', decide)
    return () => {
      io?.disconnect()
      motion.removeEventListener('change', decide)
    }
  }, [])

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
        {mode === '3d' ? (
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

      <div role="group" aria-label="Ask the map" className="flex flex-wrap items-center gap-2">
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
      </div>

      <div aria-live="polite" className="lg:min-h-[6.5rem]">
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
      </figcaption>
    </figure>
  )
}
