import { earlierWork } from '../data/portfolio.js'

export default function EarlierWork() {
  return (
    <section id="earlier-work" aria-labelledby="earlier-title" className="py-12 lg:py-16">
      <h2 id="earlier-title" className="text-step-2">Earlier Android work</h2>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {earlierWork.map((w) => (
          <li key={w.name} className="border-l-2 border-plum pl-4">
            <a href={w.code} target="_blank" rel="noopener noreferrer" className="font-display text-step-1 font-semibold">
              {w.name}
            </a>
            <p className="mt-1 text-muted">{w.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
