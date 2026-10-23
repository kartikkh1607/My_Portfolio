import { achievements, certifications, personalInfo } from '../data/portfolio.js'

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="py-12 lg:py-16">
      <h2 id="achievements-title" className="text-step-2">Certifications and achievements</h2>
      <div className="panel mt-5 p-5 sm:p-7">
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <li key={c.name}>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-muted">{c.date}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-4 border-t border-line pt-6 md:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.label} className="flex items-baseline gap-3">
              {a.value && <span className="num text-step-2 leading-none text-amber">{a.value}</span>}
              <span>
                {a.label}
                {a.value && (
                  <>
                    {', '}
                    <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer">LeetCode profile</a>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
