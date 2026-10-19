import { motion } from 'framer-motion'
import { timeline } from '../data/portfolio.js'
import { fadeUp, staggerContainer, viewport } from '../utils/animations.js'

const typeColors = {
  education: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)', dot: '#6366f1' },
  milestone:  { bg: 'rgba(45,212,191,0.06)', border: 'rgba(45,212,191,0.22)', dot: '#2dd4bf' },
  learning:   { bg: 'rgba(14,165,233,0.07)', border: 'rgba(14,165,233,0.22)', dot: '#0ea5e9' },
  current:    { bg: 'rgba(34,197,94,0.07)',  border: 'rgba(34,197,94,0.25)',  dot: '#22c55e' },
}

function TimelineCard({ item, index }) {
  const colors = typeColors[item.type] || typeColors.milestone
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8 items-start`}>

      {/* Content card */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="rounded-2xl p-6 relative overflow-hidden group cursor-default"
          style={{
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(16px)',
          }}
          whileHover={{
            y: -4,
            boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${colors.dot}18`,
            transition: { duration: 0.25 },
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.dot}40, transparent)`,
            }}
          />

          {/* Year badge */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{item.icon}</span>
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                background: `${colors.dot}14`,
                border: `1px solid ${colors.dot}30`,
                color: colors.dot,
              }}
            >
              {item.year}
            </span>
            {item.type === 'current' && (
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: colors.dot }}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          <h3
            className="font-display font-bold text-white mb-1 leading-tight"
            style={{ fontSize: '1.05rem' }}
          >
            {item.title}
          </h3>
          <p
            className="font-mono text-xs mb-3 uppercase tracking-wider"
            style={{ color: colors.dot }}
          >
            {item.org}
          </p>
          <p
            className="font-light text-sm leading-relaxed"
            style={{ color: '#64748b' }}
          >
            {item.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Center spine dot */}
      <div className="hidden lg:flex flex-col items-center flex-shrink-0 pt-6" style={{ width: '48px' }}>
        <motion.div
          className="w-3 h-3 rounded-full z-10 relative"
          style={{
            background: colors.dot,
            boxShadow: `0 0 12px ${colors.dot}60`,
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={viewport}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
        />
      </div>

      {/* Spacer for alternating side */}
      <div className="hidden lg:block flex-1" />
    </div>
  )
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="section-padding relative overflow-hidden"
    >
      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45,212,191,0.04), transparent)',
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.05), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(40%, -50%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="section-label">
            02 — journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: '1.1' }}
          >
            My Journey So Far
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            From first lines of code to shipping real apps — here's the story.
          </motion.p>
        </motion.div>

        {/* Vertical spine (desktop) */}
        <div className="relative">
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(45,212,191,0.15) 10%, rgba(45,212,191,0.15) 90%, transparent)',
            }}
          />

          <div className="flex flex-col gap-8">
            {timeline.map((item, index) => (
              <TimelineCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
