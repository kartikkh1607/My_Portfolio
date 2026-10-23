import { useEffect } from 'react'
import { Check } from 'lucide-react'
import { flagship, projects } from '../data/portfolio.js'
import { useMagnetic, useTilt } from '../motion/hooks.js'
import CountUp from './motion/CountUp.jsx'
import { card, Reveal, RevealItem } from './motion/Reveal.jsx'

const external = { target: '_blank', rel: 'noopener noreferrer' }

function Stack({ items }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Stack">
      {items.map((s) => <li key={s} className="chip">{s}</li>)}
    </ul>
  )
}

// "65% → 95%": before in muted, after in amber (the only amber on a panel).
// Both count up when they scroll into view; the after value climbs from the before.
function BeforeAfter({ before, after, size }) {
  const from = before ? parseFloat(before.replace(/[^\d.]/g, '')) : 0
  return (
    <span className="num inline-flex flex-wrap items-baseline gap-x-3">
      {before && (
        <>
          <span className={`text-muted ${size.before}`}><CountUp value={before} duration={0.9} /></span>
          <span className={`text-muted ${size.before}`} aria-hidden="true">→</span>
          <span className="sr-only">to</span>
        </>
      )}
      <span className={`text-amber ${size.after}`}><CountUp value={after} from={from} delay={before ? 0.5 : 0} /></span>
    </span>
  )
}

// Glass project card: reveals on scroll, tilts toward the cursor.
// data-scene tells the 3D background which cluster to light up.
function Card({ p, tilt = 3, className = '', panelClass = '', children }) {
  const ref = useTilt(tilt)

  // The animated gradient border repaints every frame; run it only on screen.
  useEffect(() => {
    const el = ref.current
    if (!panelClass.includes('gradient-border')) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('in-view', e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [ref, panelClass])

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <Reveal
        as="article"
        ref={ref}
        id={p.id}
        data-scene={p.id}
        aria-labelledby={`${p.id}-title`}
        variants={card}
        amount={0.06}
        className={`panel glow-hover ${panelClass}`}
      >
        {children}
      </Reveal>
    </div>
  )
}

function Flagship() {
  const p = flagship
  const demo = useMagnetic()
  return (
    <Card p={p} tilt={1.2} panelClass="gradient-border grid gap-10 p-5 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:p-10">
      <div>
        <RevealItem>
          <p className="eyebrow">Flagship project</p>
          <h3 id={`${p.id}-title`} className="mt-2 text-step-3">{p.name}</h3>
          <p className="measure mt-4 text-step-1">{p.problem}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a ref={demo} href={p.live} {...external} className="btn btn-primary">Try the live demo</a>
            <a href={p.code} {...external} className="btn btn-secondary">Code</a>
          </div>
        </RevealItem>

        <RevealItem>
          <h4 className="mt-8 text-step-1">How it works</h4>
          <ul className="measure mt-2 grid gap-2 pl-5 [list-style:disc] marker:text-cyan">
            {p.approach.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </RevealItem>

        <RevealItem className="measure mt-6 border-l-2 border-violet pl-4">
          <h4 className="text-step-0">What I found</h4>
          <p className="mt-1">{p.finding}</p>
        </RevealItem>

        <RevealItem className="mt-8"><Stack items={p.stack} /></RevealItem>
      </div>

      <div className="lg:border-l lg:border-line lg:pl-10">
        <RevealItem>
          <p className="text-muted">{p.headline.label}, before and after query rewriting</p>
          <p className="mt-2 leading-none">
            <BeforeAfter
              before={p.headline.before}
              after={p.headline.after}
              size={{ before: 'text-step-3', after: 'text-step-4 sm:text-step-5' }}
            />
          </p>
        </RevealItem>

        <RevealItem as="dl" className="mt-6 grid gap-4 border-y border-line py-4 sm:grid-cols-2">
          {p.secondary.map((m) => (
            <div key={m.label}>
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="mt-1 leading-none">
                <BeforeAfter before={m.before} after={m.after} size={{ before: 'text-step-1', after: 'text-step-2' }} />
              </dd>
            </div>
          ))}
        </RevealItem>

        <RevealItem className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.9375rem] [font-variant-numeric:tabular-nums]">
            <caption className="pb-3 text-left text-sm text-muted">{p.evalCaption}</caption>
            <thead>
              <tr className="border-b border-line">
                {p.evalColumns.map((c, i) => (
                  <th key={c} scope="col" className={`py-2 font-medium text-muted ${i ? 'pl-3 text-right' : 'pr-2'}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.evalRows.map(([setup, ...vals], r) => {
                const current = r === p.evalRows.length - 1
                return (
                  <tr key={setup} className={`border-b border-line last:border-0 ${current ? 'font-medium' : ''}`}>
                    <th scope="row" className={`py-2 pr-2 ${current ? 'font-medium' : 'font-normal'}`}>{setup}</th>
                    {vals.map((v, i) => <td key={i} className="py-2 pl-3 text-right">{v}</td>)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </RevealItem>
      </div>
    </Card>
  )
}

function ProjectHeader({ p }) {
  return (
    <RevealItem as="header">
      <h3 id={`${p.id}-title`} className="text-step-2">{p.name}</h3>
      <p className="mt-1 text-muted">{p.subtitle}</p>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {p.live && <a href={p.live} {...external}>Live demo</a>}
        <a href={p.code} {...external}>Code</a>
      </p>
      {p.liveNote && <p className="mt-1 text-sm text-muted">{p.liveNote}</p>}
    </RevealItem>
  )
}

function Points({ items }) {
  return (
    <RevealItem as="ul" className="grid gap-2 pl-5 [list-style:disc] marker:text-cyan">
      {items.map((pt) => <li key={pt}>{pt}</li>)}
    </RevealItem>
  )
}

function HireMeAI({ p, className }) {
  const e = p.evidence
  return (
    <Card p={p} className={className} panelClass="flex flex-col gap-6 p-5 sm:p-7">
      <ProjectHeader p={p} />
      <RevealItem>
        <p>{p.problem}</p>
        <p className="mt-6 text-muted">{p.approach}</p>
      </RevealItem>

      <RevealItem className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:gap-8">
        <section aria-labelledby={`${p.id}-hardening`}>
          <h4 id={`${p.id}-hardening`} className="text-step-1">{e.title}</h4>
          <ul className="mt-3 grid gap-2">
            {e.items.map((i) => (
              <li key={i} className="flex gap-2">
                <Check size={20} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted"><span className="font-medium text-ink">Known limitation, not fixed:</span> {e.note}</p>
        </section>

        <p className="flex items-baseline gap-3 md:flex-col md:gap-2 md:border-l md:border-line md:pl-8">
          <span className="num text-step-4 leading-none text-amber md:text-step-5"><CountUp value={e.metric.value} /></span>
          <span className="text-muted">{e.metric.label}</span>
        </p>
      </RevealItem>

      <RevealItem as="details" className="group border-t border-line pt-4">
        <summary className="cursor-pointer font-medium text-link">{p.caseStudy.title}</summary>
        <div className="mt-3 grid gap-2">
          {p.caseStudy.body.map((b) => <p key={b}>{b}</p>)}
        </div>
      </RevealItem>

      <RevealItem className="mt-auto"><Stack items={p.stack} /></RevealItem>
    </Card>
  )
}

// App → Firebase ID token → Cloudflare Worker → Gemini (fallback: Groq)
function RequestFlow({ title, description }) {
  const box = { fill: 'rgba(7, 17, 31, 0.7)', strokeWidth: 1.5, rx: 8 }
  const label = { fill: 'var(--ink)', fontSize: 16, fontWeight: 500, textAnchor: 'middle' }
  const small = { fill: 'var(--muted)', fontSize: 14 }
  return (
    <RevealItem as="figure" className="rounded-[14px] border border-line bg-[rgba(4,10,21,0.45)] p-4">
      <svg viewBox="0 0 320 258" role="img" aria-labelledby="flow-title flow-desc" className="h-auto w-full font-sans">
        <title id="flow-title">{title}</title>
        <desc id="flow-desc">{description}</desc>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
          </marker>
        </defs>

        <rect x="70" y="4" width="180" height="44" stroke="var(--map-android)" {...box} />
        <text x="160" y="31" {...label}>MealTime app</text>

        <line x1="160" y1="48" x2="160" y2="96" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="170" y="77" {...small}>Firebase ID token</text>

        <rect x="30" y="98" width="260" height="60" stroke="var(--cyan)" {...box} />
        <text x="160" y="123" {...label}>Cloudflare Worker</text>
        <text x="160" y="145" {...small} textAnchor="middle">checks token, holds API keys</text>

        <line x1="115" y1="158" x2="80" y2="206" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="205" y1="158" x2="240" y2="206" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow)" />
        <text x="232" y="186" {...small}>fallback</text>

        <rect x="4" y="208" width="148" height="46" stroke="var(--violet)" {...box} />
        <text x="78" y="236" {...label}>Gemini</text>
        <rect x="168" y="208" width="148" height="46" stroke="var(--line-strong)" strokeDasharray="5 4" {...box} />
        <text x="242" y="236" {...label}>Groq</text>
      </svg>
      <figcaption className="mt-3 text-sm text-muted">No API keys ship in the APK.</figcaption>
    </RevealItem>
  )
}

function MealTime({ p, className }) {
  return (
    <Card p={p} className={className} panelClass="flex flex-col gap-6 p-5 sm:p-7">
      <ProjectHeader p={p} />
      <RequestFlow title={p.evidence.title} description={p.evidence.description} />
      <Points items={p.points} />
      <RevealItem className="mt-auto"><Stack items={p.stack} /></RevealItem>
    </Card>
  )
}

function ReviewSchedule({ title, steps }) {
  return (
    <RevealItem as="section" aria-labelledby="schedule-title">
      <h4 id="schedule-title" className="text-step-1">{title}</h4>
      <div className="relative mt-4">
        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 border-t-2 border-line-strong" />
        <ol className="relative grid grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.days} className="relative flex flex-col items-center text-center">
              <span
                className={`num z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-bg text-step-2 ${
                  i === 0 ? 'border-dashed border-line-strong text-muted' : 'border-cyan text-ink shadow-[0_0_18px_-4px_var(--cyan)]'
                }`}
              >
                {s.days}
              </span>
              <span className="mt-1 text-sm text-muted">days</span>
              <span className="sr-only">: {s.label}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-sm text-muted">
        Days until the next review. The dashed 3 is the re-check after a failed review.
      </p>
    </RevealItem>
  )
}

function DsaTracker({ p, className }) {
  return (
    <Card p={p} className={className} panelClass="flex flex-col gap-6 p-5 sm:p-7">
      <ProjectHeader p={p} />
      <ReviewSchedule {...p.evidence} />
      <Points items={p.points} />
      <RevealItem className="mt-auto"><Stack items={p.stack} /></RevealItem>
    </Card>
  )
}

const PANELS = { hiremeai: HireMeAI, mealtime: MealTime, 'dsa-tracker': DsaTracker }

// On desktop the cards alternate sides, leaving room for the 3D background
// to show the lit cluster beside each one.
const SIDES = ['lg:w-[66%]', 'lg:ml-auto lg:w-[58%]', 'lg:w-[58%]']

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-16 lg:py-24">
      <Reveal>
        <RevealItem as="p" className="eyebrow">Selected work</RevealItem>
        <RevealItem as="h2" id="projects-title" className="mt-2 text-step-3 sm:text-step-4">Projects</RevealItem>
      </Reveal>
      <div className="mt-10"><Flagship /></div>
      {projects.map((p, i) => {
        const Panel = PANELS[p.id]
        return <Panel key={p.id} p={p} className={`mt-16 lg:mt-32 ${SIDES[i]}`} />
      })}
    </section>
  )
}
