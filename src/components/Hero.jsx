import { Download } from 'lucide-react'
import { personalInfo } from '../data/portfolio.js'
import MapSection from './map/MapSection.jsx'

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grid items-start gap-10 pb-16 pt-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pb-24 lg:pt-16"
    >
      {/* Top-aligned so the text doesn't shift when chip results expand the map column. */}
      <div className="lg:pt-24">
        <h1 id="hero-title" className="max-w-[16ch] text-step-3 sm:text-step-4">
          {personalInfo.heroLine}
        </h1>
        <p className="measure mt-5 text-step-1 text-muted">{personalInfo.subLine}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={personalInfo.resume} download className="btn btn-primary">
            <Download size={18} aria-hidden="true" />
            Download resume
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            GitHub
          </a>
        </div>
      </div>
      <MapSection />
    </section>
  )
}
