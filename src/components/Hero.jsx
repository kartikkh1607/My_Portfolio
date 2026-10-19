import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo, stats } from '../data/portfolio.js'
import ParticlesCanvas from '../three/ParticlesCanvas.jsx'
import { ease, staggerContainer } from '../utils/animations.js'

const roles = [
  'Android Developer',
  'Kotlin Enthusiast',
  'Jetpack Compose Dev',
  'Clean Architecture Fan',
]

// ─── FLOATING CARD ──────────────────────────────────────────────
function GlassCard({ icon, title, sub, delay, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      transition={{ duration: 0.65, delay: 1.0 + delay, ease: ease.outExpo }}
      style={style}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration:   3.8 + delay * 0.6,
          repeat:     Infinity,
          ease:       'easeInOut',
          delay:      delay * 0.4,
        }}
        whileHover={{
          scale:      1.07,
          transition: { duration: 0.2 },
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl
                   cursor-default select-none pointer-events-auto"
        style={{
          background:           'rgba(12,26,46,0.75)',
          backdropFilter:       'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border:               '1px solid rgba(45,212,191,0.14)',
          boxShadow:            '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
          whiteSpace:           'nowrap',
        }}
      >
        <span className="text-lg leading-none">{icon}</span>
        <div>
          <p className="text-white font-semibold leading-tight"
            style={{ fontSize: '0.8rem' }}>
            {title}
          </p>
          <p className="font-mono leading-tight mt-0.5"
            style={{ fontSize: '0.68rem', color: '#2dd4bf' }}>
            {sub}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── PHONE MOCKUP ───────────────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
      style={{ width: '188px', height: '390px' }}
    >
      {/* Glow behind phone */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset:      '-30px',
          background: 'radial-gradient(ellipse, rgba(45,212,191,0.12), transparent 65%)',
          filter:     'blur(20px)',
        }}
      />

      {/* Phone shell */}
      <div
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden"
        style={{
          background: 'rgba(8,18,36,0.97)',
          border:     '1.5px solid rgba(45,212,191,0.2)',
          boxShadow:  '0 48px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Scan line animation */}
        <div
          className="absolute left-0 right-0 h-px z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.45), transparent)',
            animation:  'scan 3.5s ease-in-out infinite',
          }}
        />

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-1">
          <span className="font-mono" style={{ fontSize: '9px', color: '#4a7a9b' }}>
            9:41
          </span>
          <div className="flex gap-[3px] items-end">
            {[3, 4, 5, 6].map((h, i) => (
              <div key={i} className="w-[3px] rounded-sm"
                style={{ height: `${h}px`, background: '#2dd4bf', opacity: 0.4 + i * 0.18 }} />
            ))}
          </div>
        </div>

        {/* App content */}
        <div className="px-4 pt-2 pb-3">
          {/* App header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-mono uppercase tracking-widest"
                style={{ fontSize: '8px', color: '#2dd4bf' }}>
                MyRecipe
              </p>
              <p className="text-white font-bold" style={{ fontSize: '13px' }}>
                Discover
              </p>
            </div>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', fontSize: '14px' }}
            >
              🍳
            </div>
          </div>

          {/* Search bar */}
          <div
            className="rounded-xl px-3 py-2 mb-3 flex items-center gap-2"
            style={{
              background: 'rgba(45,212,191,0.06)',
              border:     '1px solid rgba(45,212,191,0.12)',
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full border"
              style={{ borderColor: '#4a7a9b' }} />
            <p className="font-mono" style={{ fontSize: '9px', color: '#4a7a9b' }}>
              Search recipes...
            </p>
          </div>

          {/* Recipe cards */}
          {[
            { name: 'Pasta Carbonara', kcal: '420 kcal', color: '#f97316', delay: 1.4 },
            { name: 'Avocado Toast',   kcal: '280 kcal', color: '#22c55e', delay: 1.55 },
            { name: 'Berry Smoothie',  kcal: '180 kcal', color: '#a855f7', delay: 1.7  },
          ].map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0  }}
              transition={{ delay: item.delay, duration: 0.4, ease: ease.outExpo }}
              className="flex items-center gap-2 rounded-xl px-3 py-2 mb-2"
              style={{ background: 'rgba(30,58,82,0.35)' }}
            >
              <div className="w-5 h-5 rounded-lg flex-shrink-0"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate" style={{ fontSize: '9px' }}>
                  {item.name}
                </p>
                <p className="font-mono" style={{ fontSize: '8px', color: '#4a7a9b' }}>
                  {item.kcal}
                </p>
              </div>
              <div className="w-3 h-3 rounded-full"
                style={{ background: 'rgba(45,212,191,0.15)', border: '1px solid rgba(45,212,191,0.3)' }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom nav */}
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-around py-3 px-4"
          style={{
            background:  'rgba(5,13,24,0.92)',
            borderTop:   '1px solid rgba(45,212,191,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
            <div key={i} className="flex flex-col items-center gap-[3px]">
              <span style={{ fontSize: '12px' }}>{icon}</span>
              {i === 0 && (
                <div className="w-1 h-1 rounded-full" style={{ background: '#2dd4bf' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phone floor reflection */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width:      '120px',
          height:     '24px',
          background: 'radial-gradient(ellipse, rgba(45,212,191,0.1), transparent 70%)',
          filter:     'blur(10px)',
        }}
      />
    </motion.div>
  )
}

// ─── HERO VISUAL (RIGHT SIDE) ────────────────────────────────────
function HeroVisual() {
  return (
    /*
      Container: full height of the grid row.
      We use padding-top to push content up so phone
      aligns with the heading area on the left.
    */
    <div className="relative w-full h-full flex items-start justify-center pt-12">

      {/* ── Atmospheric fills ── */}

      {/* Top-right dead-space filler — subtle mint bloom */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top:        '-10%',
          right:      '-5%',
          width:      '280px',
          height:     '280px',
          background: 'radial-gradient(circle, rgba(45,212,191,0.09), transparent 65%)',
          filter:     'blur(50px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center glow behind phone */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top:        '5%',
          left:       '50%',
          transform:  'translateX(-50%)',
          width:      '220px',
          height:     '220px',
          background: 'radial-gradient(circle, rgba(45,212,191,0.13), transparent 65%)',
          filter:     'blur(40px)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Phone ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.9, delay: 0.45, ease: ease.outExpo }}
        className="relative z-10"
        /*
          mx-auto + slight left offset to pull composition
          toward center, reducing right dead space
        */
        style={{ marginLeft: '0px' }}
      >
        <PhoneMockup />
      </motion.div>

      {/*
        ── Floating cards ──
        Triangular composition: cards orbit the phone
        creating a circular eye-flow.

        Positions (relative to the HeroVisual container):
          • Jetpack Compose  — top-left  of phone
          • Firebase         — top-right of phone (raised)
          • Clean Arch       — bottom-left
          • Kotlin Flow      — bottom-right
      */}

      {/* Jetpack Compose — upper left */}
      <GlassCard
        icon="⚡"
        title="Jetpack Compose"
        sub="Modern Android UI"
        delay={0}
        style={{ top: '4%', left: '8px' }}
      />

      {/* Firebase — upper right (raised to fill top-right space) */}
      <GlassCard
        icon="🔥"
        title="Firebase"
        sub="Auth & Firestore"
        delay={0.18}
        style={{ top: '18%', right: '-12px' }}
      />

      {/* Clean Architecture — middle left */}
      <GlassCard
        icon="🏗️"
        title="Clean Arch"
        sub="MVVM + Hilt"
        delay={0.36}
        style={{ top: '54%', left: '8px' }}
      />

      {/* Kotlin Flow — lower right */}
      <GlassCard
        icon="🌊"
        title="Kotlin Flow"
        sub="Reactive Streams"
        delay={0.54}
        style={{ top: '72%', right: '-8px' }}
      />

    </div>
  )
}

// ─── HERO STAGGER VARIANTS ──────────────────────────────────────
const heroStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}

const heroItem = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: ease.outExpo },
  },
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────
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
      }, 72)
      return () => clearTimeout(t)
    }
    if (!deleting && charIndex > current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      }, 33)
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
      className="relative min-h-screen flex items-center overflow-hidden bg-grid"
    >
      {/* Particles */}
      <ParticlesCanvas />

      {/* Global atmospheric layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 55% at 50% 105%, rgba(45,212,191,0.05), transparent)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top:        '-10%',
          left:       '-10%',
          width:      '600px',
          height:     '600px',
          background: 'radial-gradient(circle, rgba(45,212,191,0.055), transparent 60%)',
          filter:     'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom:     '-5%',
          right:      '-5%',
          width:      '450px',
          height:     '450px',
          background: 'radial-gradient(circle, rgba(56,189,248,0.035), transparent 60%)',
          filter:     'blur(80px)',
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-28"
        /*
          py-28 gives breathing room below navbar (h-16 = 4rem)
          without stretching the layout too far down
        */
        style={{ paddingTop: '7rem', paddingBottom: '5rem' }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          /*
            gap-8 instead of gap-16 pulls the two columns
            slightly closer together, reducing dead right space
          */
          style={{ gap: '5rem' }}
        >

          {/* ── LEFT — Text ── */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            /*
              Slight top padding so the text block starts
              below the phone top, creating natural alignment
            */
            style={{ paddingTop: '0.5rem' }}
          >

            {/* Badge */}
            <motion.div variants={heroItem}>
              <motion.div
                className="inline-flex items-center gap-2 font-mono
                           px-4 py-2 rounded-full mb-7 cursor-default select-none"
                style={{
                  fontSize:   '0.7rem',
                  background: 'rgba(45,212,191,0.07)',
                  border:     '1px solid rgba(45,212,191,0.18)',
                  color:      '#2dd4bf',
                }}
                whileHover={{
                  background:  'rgba(45,212,191,0.11)',
                  borderColor: 'rgba(45,212,191,0.32)',
                  transition:  { duration: 0.2 },
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#2dd4bf' }}
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.35, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                Open to Internships &amp; Freelance
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.div variants={heroItem}>
              <h1
                className="font-display font-bold tracking-tight leading-tight mb-4"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.75rem)' }}
              >
                <span className="text-white">Hi, I'm </span>
                <span
                  style={{
                    background:           'linear-gradient(135deg, #2dd4bf 0%, #5eead4 55%, #99f6e4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                >
                  {personalInfo.name.split(' ')[0]}
                </span>
                <br />
                <span style={{ color: '#cbd5e1' }}>
                  {personalInfo.name.split(' ')[1]}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              variants={heroItem}
              className="flex items-center gap-2 mb-5"
              style={{ height: '2rem' }}
            >
              <span
                className="font-mono font-medium"
                style={{
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.3rem)',
                  color:    '#2dd4bf',
                }}
              >
                {displayed}
              </span>
              <motion.span
                className="inline-block w-px h-5"
                style={{ background: '#2dd4bf' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={heroItem}
              className="font-light leading-relaxed mb-9 max-w-md"
              style={{
                fontSize:   'clamp(0.95rem, 1.4vw, 1.08rem)',
                color:      '#94a3b8',
                lineHeight: '1.78',
              }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="flex flex-wrap gap-3 mb-14"
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{  scale: 0.97 }}
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
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{  scale: 0.97 }}
              >
                Get in Touch
              </motion.a>

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{  scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={heroItem}
              className="flex flex-wrap gap-8 pt-7"
              style={{ borderTop: '1px solid rgba(30,58,82,0.65)' }}
            >
              {stats.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{
                    delay:    1.1 + i * 0.08,
                    duration: 0.5,
                    ease:     ease.outExpo,
                  }}
                >
                  <span
                    className="font-display text-2xl font-bold block leading-none mb-1"
                    style={{ color: '#f1f5f9' }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-mono uppercase tracking-widest"
                    style={{ fontSize: '0.6rem', color: '#334155' }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* ── RIGHT — Visual ── */}
          <motion.div
            className="relative hidden lg:block"
            /*
              Fixed height that matches left side rhythm.
              items-start on parent + pt-4 on HeroVisual
              pulls phone up to align with heading.
            */
            style={{ height: '500px', paddingLeft: '2rem' }}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.9, delay: 0.35, ease: ease.outExpo }}
          >
            <HeroVisual />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 z-10
                   cursor-pointer select-none"
        style={{ color: '#1e3a52' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        whileHover={{ color: '#2dd4bf', transition: { duration: 0.2 } }}
      >
        <span className="font-mono uppercase tracking-widest"
          style={{ fontSize: '0.6rem' }}>
          scroll
        </span>
        <motion.svg
          className="w-3.5 h-3.5"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>

    </section>
  )
}