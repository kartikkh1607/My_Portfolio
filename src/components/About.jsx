import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio.js'
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, scaleIn,
  viewport
} from '../utils/animations.js'

const highlights = [
  { icon: '🎓', label: 'College',  value: personalInfo.college  },
  { icon: '📚', label: 'Branch',   value: personalInfo.branch   },
  { icon: '📅', label: 'Year',     value: personalInfo.year     },
  { icon: '📍', label: 'Location', value: personalInfo.city     },
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
  { num: '9+',  label: 'Repositories' },
  { num: '3+',  label: 'Projects'     },
  { num: '2nd', label: 'Year'         },
]

export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Ambient background orb */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="section-label">
            01 — about me
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            The Person Behind the Code
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            A little bit about who I am, where I study,
            and what drives me to build.
          </motion.p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Side */}
          <motion.div
            className="flex flex-col gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >

            {/* Bio */}
            <motion.div variants={fadeLeft}>
              <p className="text-lg font-light leading-relaxed mb-4"
                style={{ color: '#b8d4e3' }}>
                {personalInfo.about}
              </p>
              <p className="font-light leading-relaxed"
                style={{ color: '#7fb3cc' }}>
                Currently in my{' '}
                <span className="font-medium" style={{ color: '#2dd4bf' }}>
                  2nd year at KIET Group of Institutions
                </span>
                , I'm actively seeking internships and freelance
                opportunities where I can contribute, learn from
                real-world problems, and grow as an Android engineer.
              </p>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
            >
              {highlights.map(({ icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: 'rgba(45,212,191,0.3)',
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-start gap-3 rounded-xl p-4 cursor-default"
                  style={{
                    background: 'rgba(15,32,53,0.6)',
                    border: '1px solid rgba(30,58,82,0.8)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider mb-0.5"
                      style={{ color: '#4a7a9b' }}>
                      {label}
                    </p>
                    <p className="text-white font-medium text-sm">{value}</p>
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{  scale: 0.96 }}
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{  scale: 0.96 }}
              >
                LinkedIn
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </motion.div>

          </motion.div>

          {/* Right Side */}
          <motion.div
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >

            {/* Status Card */}
            <motion.div
              variants={fadeRight}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(45,212,191,0.05)',
                border: '1px solid rgba(45,212,191,0.15)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 40px rgba(45,212,191,0.05)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#2dd4bf' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: '#2dd4bf' }}>
                  Currently Available
                </span>
              </div>

              <p className="font-light text-sm leading-relaxed mb-4"
                style={{ color: '#b8d4e3' }}>
                Actively looking for{' '}
                <span className="font-semibold text-white">
                  Android Developer internships
                </span>{' '}
                and freelance mobile app projects. I bring clean code,
                modern architecture, and fast delivery.
              </p>

              <div
                className="pt-4 flex flex-wrap gap-2"
                style={{ borderTop: '1px solid rgba(45,212,191,0.1)' }}
              >
                {['Internship', 'Freelance', 'Open Source', 'Hackathons'].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    whileHover={{ scale: 1.08, color: '#2dd4bf' }}
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
              <p className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: '#4a7a9b' }}>
                interests &amp; goals
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {interests.map((item, i) => (
                  <motion.span
                    key={item}
                    variants={scaleIn}
                    whileHover={{
                      scale: 1.1,
                      color: '#2dd4bf',
                      borderColor: 'rgba(45,212,191,0.4)',
                      background: 'rgba(45,212,191,0.05)',
                      transition: { duration: 0.15 },
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
              variants={staggerContainer}
              className="grid grid-cols-3 gap-4"
            >
              {quickStats.map(({ num, label }) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    borderColor: 'rgba(45,212,191,0.3)',
                    boxShadow: '0 8px 30px rgba(45,212,191,0.1)',
                    transition: { duration: 0.2 },
                  }}
                  className="card text-center cursor-default"
                >
                  <span
                    className="font-display text-2xl font-bold block mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #2dd4bf, #5eead4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {num}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wide"
                    style={{ color: '#4a7a9b' }}>
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