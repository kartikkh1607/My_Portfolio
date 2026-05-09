import { motion } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp, viewport } from '../utils/animations.js'

const skillIcons = [
  {
    name: 'Kotlin',
    color: '#7F52FF',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M2 2h10.83L2 13.09V2zm0 20l10.94-11L24 22H2zm12.16-20H24L12.16 12.39 6.36 6.47 12.16 2z"
          fill="#7F52FF"/>
      </svg>
    ),
  },
  {
    name: 'Android',
    color: '#3DDC84',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#3DDC84">
        <path d="M17.523 15.341a.75.75 0 10-.002-1.5.75.75 0 00.002 1.5zm-11.046 0a.75.75 0 10-.002-1.5.75.75 0 00.002 1.5zM12 2.25C6.615 2.25 2.25 6.615 2.25 12c0 2.568.964 4.913 2.548 6.688L3.22 20.267a.75.75 0 001.06 1.06l1.58-1.578A9.712 9.712 0 0012 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z"/>
        <path d="M8.25 9.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" fill="#fff"/>
        <path d="M3.5 7.5L5 5m16 2.5L19.5 5M8.5 5L9.5 3M15.5 5L14.5 3" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Jetpack Compose',
    color: '#4285F4',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"
          fill="#FFCA28"/>
      </svg>
    ),
  },
  {
    name: 'Room DB',
    color: '#4285F4',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M4 10v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4" stroke="#4285F4" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Retrofit',
    color: '#48A999',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
          stroke="#48A999" strokeWidth="1.5"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
          stroke="#48A999" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Hilt / DI',
    color: '#E91E63',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="#E91E63" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'MVVM',
    color: '#FF6B35',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <rect x="2" y="3" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="9" y="3" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="16" y="3" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="5.5" y="14" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="12.5" y="14" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <path d="M5 8v3h14V8M8.5 11v3M15.5 11v3" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Kotlin Flow',
    color: '#7F52FF',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M5 12c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7"
          stroke="#7F52FF" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 12c0 3.866 3.134 7 7 7" stroke="#7F52FF" strokeWidth="1.5"
          strokeLinecap="round" strokeDasharray="2 2"/>
        <path d="M12 8v4l3 3" stroke="#7F52FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Material 3',
    color: '#6750A4',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#6750A4" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" fill="#6750A4"/>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#6750A4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Git & GitHub',
    color: '#F05032',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#F05032">
        <path d="M11.998 1a10.998 10.998 0 100 22 10.998 10.998 0 000-22zm6.878 16.967c-.344.207-.79.11-1.007-.23-.245-.374-.476-.76-.697-1.143-.43-.745-.886-.908-1.879-.683a7.38 7.38 0 01-1.53.162c-2.464 0-4.36-1.172-5.477-3.37-.527-1.046-.733-2.176-.668-3.34.113-1.982 1.065-3.51 2.739-4.563 1.694-1.066 3.51-1.134 5.336-.35.891.384 1.6.988 2.12 1.812.574.908.78 1.91.64 2.98-.082.627-.29 1.21-.63 1.748a.764.764 0 00.086.97c.467.5.898 1.031 1.326 1.564.22.274.307.593.248.91-.06.325-.25.594-.507.752z"/>
      </svg>
    ),
  },
  {
    name: 'Android Studio',
    color: '#3DDC84',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#3DDC84" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 2v20M2 7l10 5 10-5" stroke="#3DDC84" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ background: 'rgba(5,13,24,0.8)' }}
    >

      {/* Ambient orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[300px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.04), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translateY(40%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="section-label">
            02 — skills
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            What I Work With
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            Technologies and tools I use to design, build,
            and ship Android applications.
          </motion.p>
        </motion.div>

        {/* Icon Grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {skillIcons.map((skill) => (
            <motion.div
              key={skill.name}
              variants={scaleIn}
              whileHover={{
                y: -6,
                scale: 1.05,
                borderColor: `${skill.color}40`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${skill.color}15`,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center justify-center gap-3
                         rounded-2xl p-5 cursor-default relative overflow-hidden"
              style={{
                background: 'rgba(15,32,53,0.6)',
                border: '1px solid rgba(30,58,82,0.8)',
                backdropFilter: 'blur(16px)',
                aspectRatio: '1',
              }}
            >
              {/* Hover glow bg */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
                style={{
                  background: `radial-gradient(circle at center, ${skill.color}10, transparent 70%)`,
                }}
                whileHover={{ opacity: 1 }}
              />

              {/* Icon */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ duration: 0.2 }}
              >
                {skill.svg}
              </motion.div>

              {/* Label */}
              <p
                className="relative z-10 font-mono text-xs text-center leading-tight"
                style={{ color: '#7fb3cc' }}
              >
                {skill.name}
              </p>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row
                     items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: 'rgba(15,32,53,0.5)',
            border: '1px solid rgba(30,58,82,0.8)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, rgba(45,212,191,0.04), transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <p className="font-display font-bold text-xl text-white mb-1">
              Always learning, always building.
            </p>
            <p className="font-light text-sm" style={{ color: '#7fb3cc' }}>
              Currently exploring Kotlin Multiplatform, AWS Cloud,
              and advanced system design.
            </p>
          </div>
          <motion.div
            className="flex flex-wrap gap-2 justify-center md:justify-end relative z-10"
          >
            {['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM', 'Hilt'].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.2 + i * 0.07 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="font-mono text-xs px-3 py-1.5 rounded-full cursor-default"
                style={{
                  background: 'rgba(45,212,191,0.08)',
                  border: '1px solid rgba(45,212,191,0.2)',
                  color: '#2dd4bf',
                }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}