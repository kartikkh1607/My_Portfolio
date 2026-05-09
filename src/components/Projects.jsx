import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, moreProjects } from '../data/portfolio.js'
import {
  fadeUp, blurIn,
  staggerContainer, ease, viewport
} from '../utils/animations.js'

function TechTag({ tech, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ delay: 0.15 + index * 0.05, ease: ease.outExpo }}
      whileHover={{
        scale:       1.08,
        y:           -2,
        color:       '#2dd4bf',
        borderColor: 'rgba(45,212,191,0.35)',
        background:  'rgba(45,212,191,0.06)',
        transition:  { duration: 0.15 },
      }}
      className="tag cursor-default"
    >
      {tech}
    </motion.span>
  )
}

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="relative rounded-3xl overflow-hidden mb-6 group"
      style={{
        background:     'rgba(12,26,46,0.7)',
        border:         '1px solid rgba(30,58,82,0.7)',
        backdropFilter: 'blur(20px)',
      }}
      whileHover={{
        borderColor: `${project.accentColor}33`,
        boxShadow:   `0 32px 80px rgba(0,0,0,0.5), 0 0 60px ${project.accentColor}0a`,
        transition:  { duration: 0.35 },
      }}
    >
      {/* Top gradient line — per-project color */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${project.accentColor}80 50%, transparent 100%)`,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5">

        {/* Left — Content */}
        <div className="lg:col-span-3 p-10 flex flex-col gap-7 justify-center">

          {/* Icon + Title */}
          <div className="flex items-start gap-5">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color}
                          flex items-center justify-center text-3xl flex-shrink-0`}
              style={{ boxShadow: `0 8px 32px ${project.accentColor}30` }}
              whileHover={{ scale: 1.1, rotate: -6 }}
              transition={{ duration: 0.25 }}
            >
              {project.icon}
            </motion.div>
            <div>
              <p
                className="font-mono text-2xs uppercase tracking-widest mb-1.5"
                style={{ color: project.accentColor }}
              >
                {project.subtitle}
              </p>
              <h3
                className="font-display font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: '1.1' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            className="font-light leading-relaxed"
            style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.8' }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <TechTag key={t} tech={t} index={i} />
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 pt-1 flex-wrap">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{  scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View Code
            </motion.a>

            {/* Live Demo — only renders if URL provided */}
            {project.liveDemo && (
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{  scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </motion.a>
            )}
          </div>

        </div>

        {/* Right — Screenshot Panel */}
        <div
          className="lg:col-span-2 relative hidden lg:flex items-center
                     justify-center p-8 overflow-hidden"
          style={{
            borderLeft: '1px solid rgba(30,58,82,0.5)',
            background: 'rgba(5,13,24,0.5)',
          }}
        >
          {/* Background glow orb */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${project.accentColor}0c, transparent 65%)`,
            }}
          />

          {/* Screenshot or fallback stack */}
          {project.screenshot && !imgError ? (
            <motion.div
              className="relative z-10 w-full"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewport}
              transition={{ delay: 0.3, duration: 0.6, ease: ease.outExpo }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              {/* Device frame wrapper */}
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  border: `1px solid ${project.accentColor}25`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`,
                }}
              >
                <img
                  src={project.screenshot}
                  alt={`${project.name} app screenshot`}
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '260px', objectPosition: 'top' }}
                  onError={() => setImgError(true)}
                />
                {/* Subtle overlay gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(5,13,24,0.8), transparent)',
                  }}
                />
              </div>
            </motion.div>
          ) : (
            /* Fallback: floating stack items */
            <div className="relative z-10 flex flex-col gap-3 w-full max-w-[200px]">
              {project.tech.slice(0, 4).map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ delay: 0.3 + i * 0.1, ease: ease.outExpo }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default"
                  style={{
                    background:     'rgba(15,32,53,0.85)',
                    border:         `1px solid ${project.accentColor}1a`,
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: project.accentColor }}
                  />
                  <span className="font-mono text-xs text-white">{t}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  )
}

// ── Mini project card for the "More Work" grid ────────────────────
function MiniProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: ease.outExpo }}
      className="rounded-2xl p-6 relative overflow-hidden group cursor-default"
      style={{
        background:     'rgba(12,26,46,0.6)',
        border:         '1px solid rgba(30,58,82,0.7)',
        backdropFilter: 'blur(16px)',
      }}
      whileHover={{
        y:           -4,
        borderColor: `${project.color}33`,
        boxShadow:   `0 16px 40px rgba(0,0,0,0.4), 0 0 24px ${project.color}10`,
        transition:  { duration: 0.2 },
      }}
    >
      {/* Top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
        }}
      />

      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: `${project.color}14`,
            border:     `1px solid ${project.color}25`,
          }}
        >
          {project.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-white text-sm">{project.name}</h4>
        </div>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.15 }}
          onClick={e => e.stopPropagation()}
          title="View on GitHub"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#2dd4bf' }}>
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </motion.a>
      </div>

      <p
        className="font-light text-xs leading-relaxed mb-4"
        style={{ color: '#64748b', lineHeight: '1.7' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <span
            key={t}
            className="font-mono text-2xs px-2 py-0.5 rounded-full"
            style={{
              background: `${project.color}10`,
              border:     `1px solid ${project.color}22`,
              color:      project.color,
              fontSize:   '0.62rem',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      style={{ background: 'rgba(5,13,24,0.6)' }}
    >

      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 100% 40%, rgba(45,212,191,0.04), transparent)',
        }}
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.04), transparent 70%)',
          filter:     'blur(80px)',
          transform:  'translate(40%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.03), transparent 70%)',
          filter:     'blur(80px)',
          transform:  'translate(-30%, 30%)',
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
            04 — projects
          </motion.p>
          <motion.h2
            variants={blurIn}
            className="font-display font-bold tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: '1.1' }}
          >
            Things I've Built
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            Real Android projects — each built with clean architecture,
            modern Jetpack libraries, and attention to detail.
          </motion.p>
        </motion.div>

        {/* Featured projects */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* More projects — mini grid */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(to right, rgba(45,212,191,0.2), transparent)' }}
            />
            <p
              className="font-mono text-xs uppercase tracking-widest flex-shrink-0"
              style={{ color: '#334155' }}
            >
              more work
            </p>
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(to left, rgba(45,212,191,0.2), transparent)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moreProjects.map((project, index) => (
              <MiniProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, rgba(45,212,191,0.3), transparent)' }}
          />
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: '#334155' }}
          >
            more on github
          </p>
          <motion.a
            href="https://github.com/kartikkh1607"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{  scale: 0.97 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View All on GitHub
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}