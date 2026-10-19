import { achievements, certifications, personalInfo } from '../data/portfolio.js'

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="py-12">
      <h2 id="achievements-title" className="text-3xl font-bold">Certifications and achievements</h2>
      <ul className="mt-4 grid max-w-[70ch] gap-1">
        {certifications.map((c) => (
          <li key={c.name}>{c.name} ({c.date})</li>
        ))}
        {achievements.map((a) => <li key={a}>{a}</li>)}
      </ul>
      <p className="mt-3">
        <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer">LeetCode profile</a>
      </p>
    </section>
  )
}
