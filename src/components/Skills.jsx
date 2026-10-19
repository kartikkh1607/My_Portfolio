import { skills } from '../data/portfolio.js'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-16 lg:py-20">
      <h2 id="skills-title" className="text-step-3">Skills</h2>
      <dl className="mt-8 border-t border-line">
        {skills.map(({ group, items }) => (
          <div key={group} className="grid gap-1 border-b border-line py-4 md:grid-cols-[14rem_1fr] md:gap-8">
            <dt className="font-display text-step-1 font-semibold">{group}</dt>
            <dd className="measure">{items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
