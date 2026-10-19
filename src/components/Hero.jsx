import { ArrowDown, Download } from 'lucide-react'
import { personalInfo } from '../data/portfolio.js'
import { useMagnetic } from '../motion/hooks.js'
import HeroMap from './map/HeroMap.jsx'
import RoleLine from './motion/RoleLine.jsx'

export default function Hero() {
  const resume = useMagnetic()
  const github = useMagnetic()

  return (
    <section
      id="top"
      data-scene="top"
      aria-labelledby="hero-title"
      className="grid items-start gap-10 pb-16 pt-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8 lg:pb-24 lg:pt-32"
    >
      {/* CSS-only entrance; the text only moves (no fade) so it paints immediately. */}
      <div className="lg:pt-16">
        <p className="eyebrow rise-fade">GenAI engineer · RAG · evals · LLM apps</p>
        <h1 id="hero-title" className="rise mt-4 text-[clamp(2rem,8.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] lg:text-[clamp(3rem,4.3vw,4rem)]">
          <span className="text-gradient">{personalInfo.name}</span>
        </h1>
        <div className="rise mt-4" style={{ '--d': '0.08s' }}>
          <RoleLine name={personalInfo.name} roles={personalInfo.roles} />
        </div>
        <p className="rise measure mt-6 text-step-1 text-ink" style={{ '--d': '0.14s' }}>
          {personalInfo.heroLine}
        </p>
        <p className="rise measure mt-3 text-muted" style={{ '--d': '0.18s' }}>
          {personalInfo.subLine}
        </p>
        <div className="rise-fade mt-8 flex flex-wrap gap-3" style={{ '--d': '0.3s' }}>
          <a ref={resume} href={personalInfo.resume} download className="btn btn-primary">
            <Download size={18} aria-hidden="true" />
            Download resume
          </a>
          <a ref={github} href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            GitHub
          </a>
          <a href="#projects" className="btn text-muted no-underline hover:text-ink">
            Projects
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="rise" style={{ '--d': '0.2s' }}>
        <HeroMap />
      </div>
    </section>
  )
}
