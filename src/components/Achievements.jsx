import { achievements, certifications, personalInfo } from '../data/portfolio.js'
import CountUp from './motion/CountUp.jsx'
import { Reveal, RevealItem } from './motion/Reveal.jsx'

export default function Achievements() {
  return (
    <section id="achievements" data-scene="achievements" aria-labelledby="achievements-title" className="py-12 lg:py-20">
      <Reveal>
        <RevealItem as="h2" id="achievements-title" className="text-step-2">Certifications and achievements</RevealItem>
      </Reveal>
      <Reveal amount={0.1} className="panel mt-6 p-5 sm:p-7">
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <RevealItem as="li" key={c.name}>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-muted">{c.date}</p>
            </RevealItem>
          ))}
        </ul>
        <ul className="mt-6 grid gap-4 border-t border-line pt-6 md:grid-cols-2">
          {achievements.map((a) => (
            <RevealItem as="li" key={a.label} className="flex items-baseline gap-3">
              {a.value && <span className="num text-step-2 leading-none text-amber"><CountUp value={a.value} /></span>}
              <span>
                {a.label}
                {a.value && (
                  <>
                    {', '}
                    <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer">LeetCode profile</a>
                  </>
                )}
              </span>
            </RevealItem>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
