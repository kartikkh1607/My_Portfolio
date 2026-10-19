import { personalInfo } from '../data/portfolio.js'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="py-12">
      <h1 id="hero-title" className="max-w-[20ch] text-4xl font-bold leading-tight">
        {personalInfo.heroLine}
      </h1>
      <p className="mt-4 max-w-[70ch]">{personalInfo.subLine}</p>
      <p className="mt-6 flex flex-wrap gap-4">
        <a href={personalInfo.resume} download>Download resume</a>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </section>
  )
}
