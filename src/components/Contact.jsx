import { useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio.js'
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, scaleIn, viewport
} from '../utils/animations.js'

const contactLinks = [
  {
    icon: '✉️',
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    short: personalInfo.email,
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'Kartik Khandelwal',
    href: personalInfo.linkedin,
    short: 'kartik-khandelwal',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'kartikkh1607',
    href: personalInfo.github,
    short: 'kartikkh1607',
  },
]

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`)
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: 'rgba(5,13,24,0.9)' }}
    >

      {/* Ambient orbs */}
      <div
        className="absolute top-0 left-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(45,212,191,0.06), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-50%, -40%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.04), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(30%, 30%)',
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
            04 — contact
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Let's Work Together
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            Have a project in mind or want to discuss an opportunity?
            I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left Side */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >

            {/* Availability Card */}
            <motion.div
              variants={fadeLeft}
              whileHover={{
                scale: 1.01,
                borderColor: 'rgba(45,212,191,0.3)',
                boxShadow: '0 0 40px rgba(45,212,191,0.08)',
                transition: { duration: 0.2 },
              }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(45,212,191,0.04)',
                border: '1px solid rgba(45,212,191,0.15)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#2dd4bf' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: '#2dd4bf' }}>
                  Available Now
                </span>
              </div>
              <p className="font-light text-sm leading-relaxed"
                style={{ color: '#b8d4e3' }}>
                Open to{' '}
                <span className="font-semibold text-white">
                  Android internships
                </span>
                , freelance mobile projects, and open-source
                collaborations.
              </p>
            </motion.div>

            {/* Contact Links */}
            <div className="flex flex-col gap-3">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  variants={fadeLeft}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: 'rgba(45,212,191,0.3)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 rounded-xl p-4 group"
                  style={{
                    background: 'rgba(15,32,53,0.6)',
                    border: '1px solid rgba(30,58,82,0.8)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center
                               justify-center text-lg flex-shrink-0"
                    style={{
                      background: 'rgba(45,212,191,0.08)',
                      border: '1px solid rgba(45,212,191,0.15)',
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.icon}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs uppercase tracking-wider mb-0.5"
                      style={{ color: '#4a7a9b' }}>
                      {link.label}
                    </p>
                    <p className="text-sm font-medium truncate transition-colors duration-200"
                      style={{ color: '#b8d4e3' }}
                      className="group-hover:text-mint-400">
                      {link.short}
                    </p>
                  </div>

                  <svg
                    className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100
                               transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                    style={{ color: '#2dd4bf' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>

                </motion.a>
              ))}
            </div>

          </motion.div>

          {/* Right Side — Form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: 'rgba(15,32,53,0.6)',
                border: '1px solid rgba(30,58,82,0.8)',
                backdropFilter: 'blur(16px)',
              }}
            >

              {/* Top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)',
                }}
              />

              {status === 'sent' ? (

                <motion.div
                  className="flex flex-col items-center justify-center py-16 gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{
                      background: 'rgba(45,212,191,0.1)',
                      border: '1px solid rgba(45,212,191,0.3)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    ✅
                  </motion.div>
                  <motion.p
                    className="font-display text-xl font-bold text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Message Sent!
                  </motion.p>
                  <motion.p
                    className="font-light text-center text-sm"
                    style={{ color: '#7fb3cc' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Your email client should have opened.
                    I'll get back to you soon.
                  </motion.p>
                  <motion.button
                    onClick={() => setStatus('idle')}
                    className="btn-outline mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>

              ) : (

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Name */}
                    <motion.div
                      className="flex flex-col gap-2"
                      variants={fadeUp}
                    >
                      <label className="font-mono text-xs uppercase tracking-wider"
                        style={{ color: '#4a7a9b' }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="rounded-xl px-4 py-3 text-sm font-light
                                   outline-none transition-all duration-200"
                        style={{
                          background: 'rgba(7,17,31,0.8)',
                          border: '1px solid rgba(30,58,82,0.8)',
                          color: '#e2e8f0',
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(45,212,191,0.4)'
                          e.target.style.boxShadow   = '0 0 20px rgba(45,212,191,0.08)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(30,58,82,0.8)'
                          e.target.style.boxShadow   = 'none'
                        }}
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      className="flex flex-col gap-2"
                      variants={fadeUp}
                    >
                      <label className="font-mono text-xs uppercase tracking-wider"
                        style={{ color: '#4a7a9b' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="rounded-xl px-4 py-3 text-sm font-light
                                   outline-none transition-all duration-200"
                        style={{
                          background: 'rgba(7,17,31,0.8)',
                          border: '1px solid rgba(30,58,82,0.8)',
                          color: '#e2e8f0',
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(45,212,191,0.4)'
                          e.target.style.boxShadow   = '0 0 20px rgba(45,212,191,0.08)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(30,58,82,0.8)'
                          e.target.style.boxShadow   = 'none'
                        }}
                      />
                    </motion.div>

                  </div>

                  {/* Message */}
                  <motion.div className="flex flex-col gap-2" variants={fadeUp}>
                    <label className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: '#4a7a9b' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      className="rounded-xl px-4 py-3 text-sm font-light
                                 outline-none transition-all duration-200 resize-none"
                      style={{
                        background: 'rgba(7,17,31,0.8)',
                        border: '1px solid rgba(30,58,82,0.8)',
                        color: '#e2e8f0',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(45,212,191,0.4)'
                        e.target.style.boxShadow   = '0 0 20px rgba(45,212,191,0.08)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(30,58,82,0.8)'
                        e.target.style.boxShadow   = 'none'
                      }}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary self-start disabled:opacity-60
                               disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {status === 'sending' ? 'Opening...' : 'Send Message'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>

                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}