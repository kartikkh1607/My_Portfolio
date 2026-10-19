import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio.js'
import {
  fadeUp, fadeLeft, fadeRight, blurIn,
  staggerContainer, staggerFast, scaleIn,
  cardReveal, spring, ease, viewport
} from '../utils/animations.js'

const highlights = [
  { icon: '🎓', label: 'College',  value: personalInfo.college },
  { icon: '📚', label: 'Branch',   value: personalInfo.branch  },
  { icon: '📅', label: 'Year',     value: personalInfo.year    },
  { icon: '📍', label: 'Location', value: personalInfo.city    },
]

const interests = [
  'Clean Architecture',
  'Material You Design',
  'Open Source',
  'DSA & Problem Solving',
  'UI/UX & Animations',
  'Hackathons',
  'AWS Cloud',
  'Kotlin Multiplatform',
]

const quickStats = [
  { num: '9+',  label: 'Repos'    },
  { num: '3+',  label: 'Projects' },
  { num: '2nd', label: 'Year'     },
]

export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
    >

      {/* Section atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 0% 50%, rgba(45,212,191,0.04), transparent)',
        }}
      />
      <div
        className="absolute top-1/2 -left-32 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.05), transparent 70%)',
          filter:     'blur(60px)',
          transform:  'translateY(-50%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="section-label">
            01 — about me
          </motion.p>
          <motion.h2
            variants={blurIn}
            className="font-display font-bold tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: '1.1' }}
          >
            The Person Behind
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              the Code
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            A little bit about who I am, where I study,
            and what drives me to build.
          </motion.p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left ── */}
          <motion.div
            className="flex flex-col gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >

            {/* Bio */}
            <motion.div variants={fadeLeft} className="flex flex-col gap-5">
              <p
                className="font-light leading-relaxed"
                style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.8' }}
              >
                {personalInfo.about}
              </p>
              <p
                className="font-light leading-relaxed"
                style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.8' }}
              >
                Currently in my{' '}
                <span
                  className="font-medium"
                  style={{ color: '#2dd4bf' }}
                >
                  2nd year at KIET Group of Institutions
                </span>
                , I'm actively seeking internships and freelance
                opportunities where I can contribute, learn from
                real-world problems, and grow as an Android engineer.
              </p>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={staggerFast}
            >
              {highlights.map(({ icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={cardReveal}
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(45,212,191,0.25)',
                    boxShadow:   '0 12px 40px rgba(0,0,0,0.3)',
                    transition:  { duration: 0.2 },
                  }}
                  className="flex items-start gap-3 rounded-2xl p-4 cursor-default"
                  style={{
                    background:     'rgba(15,32,53,0.5)',
                    border:         '1px solid rgba(30,58,82,0.7)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <span className="text-lg mt-0.5 select-none">{icon}</span>
                  <div className="min-w-0">
                    <p
                      className="font-mono text-2xs uppercase tracking-widest mb-1"
                      style={{ color: '#334155' }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-white font-medium text-sm leading-snug"
                    >
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{  scale: 0.97 }}
              >
                See My Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{  scale: 0.97 }}
              >
                LinkedIn
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </motion.div>

          </motion.div>

          {/* ── Right ── */}
          <motion.div
            className="flex flex-col gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >

            {/* Status Card */}
            <motion.div
              variants={fadeRight}
              whileHover={{
                borderColor: 'rgba(45,212,191,0.25)',
                boxShadow:   '0 0 40px rgba(45,212,191,0.06)',
                transition:  { duration: 0.25 },
              }}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background:     'rgba(45,212,191,0.03)',
                border:         '1px solid rgba(45,212,191,0.12)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Subtle top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)',
                }}
              />

              <div className="flex items-center gap-2.5 mb-4">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#2dd4bf' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <span
                  className="font-mono text-2xs uppercase tracking-widest"
                  style={{ color: '#2dd4bf' }}
                >
                  Currently Available
                </span>
              </div>

              <p
                className="font-light text-sm leading-relaxed mb-5"
                style={{ color: '#94a3b8' }}
              >
                Actively looking for{' '}
                <span className="text-white font-semibold">
                  Android Developer internships
                </span>{' '}
                and freelance mobile app projects. I bring clean
                code, modern architecture, and fast delivery.
              </p>

              <div
                className="pt-4 flex flex-wrap gap-2"
                style={{ borderTop: '1px solid rgba(45,212,191,0.08)' }}
              >
                {['Internship', 'Freelance', 'Open Source', 'Hackathons'].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ delay: 0.2 + i * 0.06, ease: ease.outExpo }}
                    whileHover={{ scale: 1.07, transition: { duration: 0.15 } }}
                    className="tag cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

            </motion.div>

            {/* Interests */}
            <motion.div
              variants={fadeRight}
              className="card"
            >
              <p
                className="font-mono text-2xs uppercase tracking-widest mb-4"
                style={{ color: '#334155' }}
              >
                interests &amp; goals
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {interests.map((item) => (
                  <motion.span
                    key={item}
                    variants={scaleIn}
                    whileHover={{
                      scale:       1.08,
                      color:       '#2dd4bf',
                      borderColor: 'rgba(45,212,191,0.35)',
                      background:  'rgba(45,212,191,0.05)',
                      transition:  { duration: 0.15 },
                    }}
                    className="tag cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={staggerFast}
              className="grid grid-cols-3 gap-3"
            >
              {quickStats.map(({ num, label }) => (
                <motion.div
                  key={label}
                  variants={cardReveal}
                  whileHover={{
                    y:           -4,
                    borderColor: 'rgba(45,212,191,0.25)',
                    boxShadow:   '0 12px 32px rgba(0,0,0,0.3), 0 0 16px rgba(45,212,191,0.08)',
                    transition:  { duration: 0.2 },
                  }}
                  className="card text-center cursor-default"
                >
                  <span
                    className="font-display text-2xl font-bold block mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #2dd4bf, #5eead4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor:  'transparent',
                      backgroundClip:       'text',
                    }}
                  >
                    {num}
                  </span>
                  <span
                    className="font-mono text-2xs uppercase tracking-wider"
                    style={{ color: '#334155' }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}