import { earlierWork } from '../data/portfolio.js'

export default function EarlierWork() {
  return (
    <section id="earlier-work" aria-labelledby="earlier-title" className="py-12">
      <h2 id="earlier-title" className="text-3xl font-bold">Earlier Android work</h2>
      <ul className="mt-4 grid max-w-[70ch] gap-2">
        {earlierWork.map((w) => (
          <li key={w.name}>
            <a href={w.code} target="_blank" rel="noopener noreferrer" className="font-semibold">
              {w.name}
            </a>
            : {w.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
