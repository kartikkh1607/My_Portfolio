import { flagship, projects } from '../data/portfolio.js'

function ProjectLinks({ live, liveNote, code }) {
  return (
    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
      {live && <a href={live} target="_blank" rel="noopener noreferrer">Live demo</a>}
      <a href={code} target="_blank" rel="noopener noreferrer">Code</a>
      {liveNote && <span className="w-full text-sm text-[#5e6779]">{liveNote}</span>}
    </p>
  )
}

function Stack({ items }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Stack">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-[#d5dae3] px-3 py-0.5 text-sm">{s}</li>
      ))}
    </ul>
  )
}

function Evidence({ evidence }) {
  if (evidence.type === 'checklist') {
    return (
      <div className="mt-4">
        <h4 className="font-semibold">{evidence.title}</h4>
        <ul className="mt-1 list-disc pl-5">
          {evidence.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
        <p className="mt-2 text-sm text-[#5e6779]">{evidence.note}</p>
      </div>
    )
  }
  if (evidence.type === 'flow') {
    return (
      <div className="mt-4">
        <h4 className="font-semibold">{evidence.title}</h4>
        <ol className="mt-1 list-decimal pl-5">
          {evidence.steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
        <p className="mt-1 text-sm text-[#5e6779]">Fallback if Gemini fails: {evidence.fallback}</p>
      </div>
    )
  }
  // sequence
  return (
    <div className="mt-4">
      <h4 className="font-semibold">{evidence.title}</h4>
      <ol className="mt-1 flex flex-wrap gap-3">
        {evidence.steps.map((d) => <li key={d}>{d}</li>)}
      </ol>
    </div>
  )
}

function Flagship() {
  const p = flagship
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="mt-6">
      <h3 id={`${p.id}-title`} className="text-2xl font-bold">{p.name}</h3>
      <ProjectLinks live={p.live} code={p.code} />
      <Stack items={p.stack} />
      <p className="mt-4 max-w-[70ch]"><strong>Problem.</strong> {p.problem}</p>
      <ul className="mt-2 max-w-[70ch] list-disc pl-5">
        {p.approach.map((a) => <li key={a}>{a}</li>)}
      </ul>
      <p className="mt-2 max-w-[70ch]"><strong>Key finding.</strong> {p.finding}</p>

      <p className="mt-4 text-xl font-bold">
        {p.headline.label}: {p.headline.before} to {p.headline.after}
      </p>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-[520px] border-collapse text-left">
          <caption className="pb-2 text-left text-sm text-[#5e6779]">{p.evalCaption}</caption>
          <thead>
            <tr>
              {p.evalColumns.map((c) => (
                <th key={c} scope="col" className="border-b border-[#d5dae3] py-1 pr-4">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.evalRows.map(([setup, ...vals]) => (
              <tr key={setup}>
                <th scope="row" className="py-1 pr-4 font-normal">{setup}</th>
                {vals.map((v, i) => <td key={i} className="py-1 pr-4">{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

function Project({ p }) {
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`}>
      <h3 id={`${p.id}-title`} className="text-xl font-bold">{p.name}</h3>
      <p className="text-[#5e6779]">{p.subtitle}</p>
      <ProjectLinks live={p.live} liveNote={p.liveNote} code={p.code} />
      <Stack items={p.stack} />
      {p.problem && <p className="mt-4"><strong>Problem.</strong> {p.problem}</p>}
      {p.approach && <p className="mt-2">{p.approach}</p>}
      {p.points && (
        <ul className="mt-4 list-disc pl-5">
          {p.points.map((pt) => <li key={pt}>{pt}</li>)}
        </ul>
      )}
      <Evidence evidence={p.evidence} />
      {p.caseStudy && (
        <details className="mt-4">
          <summary className="cursor-pointer font-semibold">{p.caseStudy.title}</summary>
          {p.caseStudy.body.map((b) => <p key={b} className="mt-2">{b}</p>)}
        </details>
      )}
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-12">
      <h2 id="projects-title" className="text-3xl font-bold">Projects</h2>
      <Flagship />
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {projects.map((p) => <Project key={p.id} p={p} />)}
      </div>
    </section>
  )
}
