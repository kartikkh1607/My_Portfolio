import { skills } from '../data/portfolio.js'
import { Reveal, RevealItem } from './motion/Reveal.jsx'

export default function Skills() {
  return (
    <section id="skills" data-scene="skills" aria-labelledby="skills-title" className="py-16 lg:py-24">
      <Reveal>
        <RevealItem as="p" className="eyebrow">Toolbox</RevealItem>
        <RevealItem as="h2" id="skills-title" className="mt-2 text-step-3">Skills</RevealItem>
      </Reveal>
      <Reveal as="dl" amount={0.05} className="panel mt-8 px-5 sm:px-8">
        {skills.map(({ group, items }) => (
          <RevealItem
            key={group}
            className="grid gap-1 border-b border-line py-5 last:border-0 md:grid-cols-[14rem_1fr] md:gap-8"
          >
            <dt className="font-display text-step-1 font-semibold">{group}</dt>
            <dd className="measure text-muted">
              {items.map((item, i) => (
                <span key={item}>
                  <span className="text-ink">{item}</span>
                  {i < items.length - 1 && ', '}
                </span>
              ))}
            </dd>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}
