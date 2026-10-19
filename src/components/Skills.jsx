import { skills } from '../data/portfolio.js'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-12">
      <h2 id="skills-title" className="text-3xl font-bold">Skills</h2>
      <dl className="mt-4 grid max-w-[70ch] gap-3">
        {skills.map(({ group, items }) => (
          <div key={group}>
            <dt className="font-semibold">{group}</dt>
            <dd>{items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
