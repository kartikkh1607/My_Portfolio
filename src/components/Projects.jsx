import { motion } from 'framer-motion'
import { projects } from '../data/portfolio.js'
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, scaleIn, viewport
} from '../utils/animations.js'

function FeaturedProject({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="relative rounded-3xl overflow-hidden mb-8 group"
      style={{
        background: 'rgba(15,32,53,0.7)',
        border: '1px solid rgba(30,58,82,0.8)',
        backdropFilter: 'blur(16px)',
      }}
      whileHover={{
        borderColor: 'rgba(45,212,191,0.25)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(45,212,191,0.08)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.5), transparent)',
        }}
      />

      {/* Featured badge */}
      <div className="absolute top-6 right-6 z-10">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ delay: 0.4 }}
          className="font-mono text-xs px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(45,212,191,0.1)',
            border: '1px solid rgba(45,212,191,0.3)',
            color: '#2dd4bf',
          }}
        >
          ★ Featured
        </motion.span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* Left — Content */}
        <div className="p-10 flex flex-col gap-6 justify-center">

          <div className="flex items-center gap-4">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color}
                          flex items-center justify-center text-3xl shadow-lg`}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.2 }}
            >
              {project.icon}
            </motion.div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1"
                style={{ color: '#2dd4bf' }}>
                {project.subtitle}
              </p>
              <h3 className="font-display text-3xl font-bold text-white tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>

          <p className="text-lg font-light leading-relaxed" style={{ color: '#b8d4e3' }}>
            {project.description}
          </p>

          <motion.div
            className="flex flex-wrap gap-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.3 + i * 0.06 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="tag cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex gap-3 pt-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View Code
            </motion.a>

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </motion.a>
          </div>

        </div>

        {/* Right — Visual Panel */}
        <div
          className="relative hidden lg:flex items-center justify-center p-10 overflow-hidden"
          style={{
            borderLeft: '1px solid rgba(30,58,82,0.6)',
            background: 'rgba(7,17,31,0.4)',
          }}
        >
          {/* Glow orb */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${
                project.color.includes('mint') ? 'rgba(45,212,191,0.08)' :
                project.color.includes('violet') ? 'rgba(139,92,246,0.08)' :
                'rgba(251,146,60,0.08)'
              }, transparent 70%)`,
            }}
          />

          {/* Large project number */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span
              className="font-display font-black select-none"
              style={{
                fontSize: '10rem',
                lineHeight: 1,
                background: 'linear-gradient(135deg, rgba(45,212,191,0.08), transparent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              01
            </span>
          </motion.div>

          {/* Floating tech stack */}
          <div className="relative z-10 flex flex-col gap-3">
            {project.tech.slice(0, 4).map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: 0.4 + i * 0.1 }}
                animate={{ y: [0, -4, 0] }}
                style={{
                  animationDuration: `${3 + i * 0.5}s`,
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(15,32,53,0.8)',
                  border: '1px solid rgba(45,212,191,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#2dd4bf' }}
                />
                <span className="font-mono text-sm text-white">{t}</span>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{
        y: -6,
        borderColor: 'rgba(45,212,191,0.25)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(45,212,191,0.06)',
        transition: { duration: 0.25 },
      }}
      className="relative rounded-2xl overflow-hidden cursor-default group"
      style={{
        background: 'rgba(15,32,53,0.6)',
        border: '1px solid rgba(30,58,82,0.8)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Top glow line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.4), transparent)',
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
      />

      <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">

        {/* Left — Number + Icon */}
        <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4">
          <span
            className="font-mono font-bold select-none"
            style={{
              fontSize: '3.5rem',
              lineHeight: 1,
              background: 'linear-gradient(135deg, rgba(30,58,82,0.8), rgba(30,58,82,0.3))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.3s',
            }}
          >
            0{index + 1}
          </span>
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color}
                        flex items-center justify-center text-2xl shadow-lg`}
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ duration: 0.2 }}
          >
            {project.icon}
          </motion.div>
        </div>

        {/* Middle — Content */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-1"
              style={{ color: '#2dd4bf' }}>
              {project.subtitle}
            </p>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
          </div>
          <p className="font-light leading-relaxed" style={{ color: '#7fb3cc' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -1 }}
                className="tag cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right — Links */}
        <div className="lg:col-span-1 flex lg:flex-col gap-3 justify-start lg:items-end">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs
                       px-4 py-2.5 rounded-xl border transition-all duration-200"
            style={{
              borderColor: 'rgba(30,58,82,0.8)',
              color: '#7fb3cc',
              background: 'rgba(15,32,53,0.4)',
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              borderColor: 'rgba(45,212,191,0.4)',
              color: '#2dd4bf',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View Code
          </motion.a>

          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.75rem', padding: '10px 16px' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </motion.a>
        </div>

      </div>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects[0]
  const rest     = projects.slice(1)

  return (
    <section id="projects" className="section-padding relative overflow-hidden">

      {/* Ambient orbs */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.05), transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate(40%, -50%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.04), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-30%, 30%)',
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
            03 — projects
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Things I've Built
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            A selection of real Android projects — each built with
            clean architecture, modern Jetpack libraries, and
            attention to detail.
          </motion.p>
        </motion.div>

        {/* Featured Project */}
        <FeaturedProject project={featured} />

        {/* Rest of projects */}
        <motion.div
          className="flex flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {rest.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 text-center"
        >
          <p className="font-light mb-5" style={{ color: '#4a7a9b' }}>
            Want to see more? All my work is on GitHub.
          </p>
          <motion.a
            href="https://github.com/kartikkh1607"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
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