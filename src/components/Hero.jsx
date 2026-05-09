import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { personalInfo, stats } from '../data/portfolio.js'
import ParticlesCanvas from '../three/ParticlesCanvas.jsx'

const roles = [
  'Android Developer',
  'Kotlin Enthusiast',
  'Jetpack Compose Dev',
  'Clean Architecture Fan',
]

const floatingCards = [
  {
    id: 1,
    icon: '⚡',
    title: 'Jetpack Compose',
    sub: 'Modern Android UI',
    delay: 0,
    x: '0%',
    y: '0%',
  },
  {
    id: 2,
    icon: '🔥',
    title: 'Firebase',
    sub: 'Auth & Firestore',
    delay: 0.3,
    x: '0%',
    y: '0%',
  },
  {
    id: 3,
    icon: '🏗️',
    title: 'Clean Architecture',
    sub: 'MVVM + Hilt',
    delay: 0.6,
    x: '0%',
    y: '0%',
  },
  {
    id: 4,
    icon: '🌊',
    title: 'Kotlin Flow',
    sub: 'Reactive Streams',
    delay: 0.9,
    x: '0%',
    y: '0%',
  },
]

function FloatingCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0,  y: 0  }}
      transition={{
        duration: 0.7,
        delay: 0.8 + card.delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3 + card.delay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: card.delay,
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default"
        style={{
          background: 'rgba(15,32,53,0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(45,212,191,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
        whileHover={{
          scale: 1.05,
          borderColor: 'rgba(45,212,191,0.4)',
          boxShadow: '0 8px 40px rgba(45,212,191,0.15)',
        }}
      >
        <span className="text-2xl">{card.icon}</span>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">
            {card.title}
          </p>
          <p className="font-mono text-xs" style={{ color: '#2dd4bf' }}>
            {card.sub}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">

      {/* Central glow orb */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.2), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Central device mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1,   y: 0  }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10"
      >
        {/* Phone frame */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mx-auto rounded-[2.5rem] overflow-hidden"
          style={{
            width: '200px',
            height: '380px',
            background: 'rgba(15,32,53,0.9)',
            border: '2px solid rgba(45,212,191,0.2)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(45,212,191,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <span className="font-mono text-[10px]" style={{ color: '#7fb3cc' }}>9:41</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 rounded-full" style={{
                  height: `${6 + i * 2}px`,
                  background: '#2dd4bf',
                  opacity: 0.6 + i * 0.2,
                }} />
              ))}
            </div>
          </div>

          {/* App header */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                style={{ background: 'linear-gradient(135deg, #2dd4bf, #14b8a6)' }}>
                🍳
              </div>
              <div>
                <p className="text-white font-semibold text-xs">MyRecipe</p>
                <p className="font-mono text-[10px]" style={{ color: '#2dd4bf' }}>Discover</p>
              </div>
            </div>

            {/* Search bar */}
            <div className="rounded-xl px-3 py-2 mb-3"
              style={{ background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.15)' }}>
              <p className="font-mono text-[10px]" style={{ color: '#4a7a9b' }}>Search recipes...</p>
            </div>

            {/* Recipe cards */}
            {[
              { name: 'Pasta Carbonara', cal: '420 kcal', color: '#f97316' },
              { name: 'Avocado Toast',   cal: '280 kcal', color: '#22c55e' },
              { name: 'Berry Smoothie',  cal: '180 kcal', color: '#a855f7' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0  }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
                className="flex items-center gap-2 rounded-xl px-3 py-2 mb-2"
                style={{ background: 'rgba(30,58,82,0.4)' }}
              >
                <div className="w-6 h-6 rounded-lg flex-shrink-0"
                  style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[10px] font-medium truncate">{item.name}</p>
                  <p className="font-mono text-[9px]" style={{ color: '#4a7a9b' }}>{item.cal}</p>
                </div>
                <div className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(45,212,191,0.15)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2dd4bf' }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-around"
            style={{ background: 'rgba(7,17,31,0.9)', borderTop: '1px solid rgba(45,212,191,0.1)' }}>
            {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-sm">{icon}</span>
                {i === 0 && (
                  <div className="w-1 h-1 rounded-full" style={{ background: '#2dd4bf' }} />
                )}
              </div>
            ))}
          </div>

        </motion.div>
      </motion.div>

      {/* Floating tech cards — positioned around phone */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-8 -left-4 pointer-events-auto">
          <FloatingCard card={floatingCards[0]} />
        </div>

        <div className="absolute top-1/3 -right-4 pointer-events-auto">
          <FloatingCard card={floatingCards[1]} />
        </div>

        <div className="absolute bottom-1/3 -left-8 pointer-events-auto">
          <FloatingCard card={floatingCards[2]} />
        </div>

        <div className="absolute bottom-8 -right-4 pointer-events-auto">
          <FloatingCard card={floatingCards[3]} />
        </div>

      </div>

    </div>
  )
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const item = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

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
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-grid overflow-hidden"
    >
      {/* Three.js */}
      <ParticlesCanvas />

      {/* Atmospheric orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] orb orb-mint opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] orb orb-blue opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] orb orb-mint opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-28 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >

            {/* Badge */}
            <motion.div variants={item}>
              <motion.div
                className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full mb-8"
                style={{
                  background: 'rgba(45,212,191,0.08)',
                  border: '1px solid rgba(45,212,191,0.2)',
                  color: '#2dd4bf',
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(45,212,191,0.4)' }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#2dd4bf' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Open to Internships &amp; Freelance
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold
                         tracking-tight leading-[1.05] mb-4"
            >
              <span className="text-white">Hi, I'm </span>
              <span style={{
                background: 'linear-gradient(135deg, #2dd4bf, #5eead4, #99f6e4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {personalInfo.name.split(' ')[0]}
              </span>
              <br />
              <span className="text-slate-200">
                {personalInfo.name.split(' ')[1]}
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={item}
              className="flex items-center gap-2 mb-6"
            >
              <span className="font-mono text-lg md:text-2xl font-medium"
                style={{ color: '#2dd4bf' }}>
                {displayed}
              </span>
              <motion.span
                className="inline-block w-0.5 h-6"
                style={{ background: '#2dd4bf' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="text-lg md:text-xl font-light max-w-lg leading-relaxed mb-10"
              style={{ color: '#b8d4e3' }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-4 mb-16"
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{  scale: 0.96 }}
              >
                View My Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>

              <motion.a
                href="#contact"
                className="btn-outline"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{  scale: 0.96 }}
              >
                Get in Touch
              </motion.a>

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{  scale: 0.96 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-8 pt-8"
              style={{ borderTop: '1px solid rgba(30,58,82,0.8)' }}
            >
              {stats.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                >
                  <span className="font-display text-2xl font-bold text-white block leading-tight"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff, #94a3b8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                    {value}
                  </span>
                  <span className="font-mono text-xs tracking-wider uppercase"
                    style={{ color: '#4a7a9b' }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* Right — Visual */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center h-[500px]"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HeroVisual />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col
                   items-center gap-2 z-10 cursor-pointer"
        style={{ color: '#4a7a9b' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  )
}