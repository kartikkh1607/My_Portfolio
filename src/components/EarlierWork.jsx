import { earlierWork } from '../data/portfolio.js'
import { Reveal, RevealItem } from './motion/Reveal.jsx'

export default function EarlierWork() {
  return (
    <section id="earlier-work" data-scene="earlier-work" aria-labelledby="earlier-title" className="py-12 lg:py-20">
      <Reveal>
        <RevealItem as="h2" id="earlier-title" className="text-step-2">Earlier Android work</RevealItem>
      </Reveal>
      <Reveal as="ul" className="mt-6 grid gap-4 md:grid-cols-2">
        {earlierWork.map((w) => (
          <RevealItem as="li" key={w.name} className="panel glow-hover border-l-2 border-l-[var(--map-android)] p-5">
            <a href={w.code} target="_blank" rel="noopener noreferrer" className="font-display text-step-1 font-semibold">
              {w.name}
            </a>
            <p className="mt-1 text-muted">{w.description}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}
