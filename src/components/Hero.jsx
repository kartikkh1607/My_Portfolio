import { useEffect, useState } from 'react'
import { personalInfo, stats } from '../data/portfolio.js'
import ParticlesCanvas from '../three/ParticlesCanvas.jsx'

const roles = [
  'Android Developer',
  'Kotlin Enthusiast',
  'Jetpack Compose Dev',
  'Clean Architecture Fan',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = roles[roleIndex]

    if (!deleting && charIndex <= current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(c => c + 1)
      }, 80)
      return () => clearTimeout(t)
    }

    if (!deleting && charIndex > current.length) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      }, 40)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }
  }, [charIndex, deleting, roleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-grid overflow-hidden">

      {/* Three.js Canvas */}
      <ParticlesCanvas />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-mint-400/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-mint-400/5 rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-28 py-32">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-mint-400/10 border border-mint-400/20 text-mint-400 text-xs font-mono px-4 py-2 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
          Open to Internships &amp; Freelance
        </div>

        {/* Name */}
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-4 animate-fade-up">
          Hi, I'm{' '}
          <span className="text-gradient">{personalInfo.name.split(' ')[0]}</span>
          <br />
          <span className="text-slate-200">{personalInfo.name.split(' ')[1]}</span>
        </h1>

        {/* Typewriter */}
        <div className="flex items-center gap-2 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="font-mono text-lg md:text-2xl text-mint-400 font-medium">
            {displayed}
          </span>
          <span className="inline-block w-0.5 h-6 bg-mint-400 animate-pulse" />
        </div>

        {/* Tagline */}
        <p className="text-dark-50 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {personalInfo.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-20 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <a href="#projects" className="btn-primary">
            View My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline">
            Get in Touch
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 pt-8 border-t border-dark-400 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {stats.map(({ label, value }) => (
            <div key={label}>
              <span className="font-display text-2xl font-bold text-white block leading-tight">
                {value}
              </span>
              <span className="font-mono text-xs text-dark-200 tracking-wider uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-200 animate-bounce z-10">
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  )
}