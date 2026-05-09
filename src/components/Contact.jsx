import { useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio.js'
import {
  fadeUp, fadeLeft, fadeRight, blurIn,
  staggerContainer, staggerFast, cardReveal,
  ease, viewport
} from '../utils/animations.js'

const contactLinks = [
  {
    icon: '✉️',
    label: 'Email',
    display: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    external: false,
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    display: 'kartik-khandelwal',
    href: personalInfo.linkedin,
    external: true,
  },
  {
    icon: '🐙',
    label: 'GitHub',
    display: 'kartikkh1607',
    href: personalInfo.github,
    external: true,
  },
]

function InputField({ label, name, value, onChange, type = 'text', placeholder, required }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-2xs uppercase tracking-widest"
        style={{ color: focused ? '#2dd4bf' : '#334155', transition: 'color 0.2s' }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() =>  setFocused(false)}
        className="rounded-xl px-4 py-3 text-sm font-light outline-none transition-all duration-300"
        style={{
          background:  focused ? 'rgba(7,17,31,0.9)' : 'rgba(7,17,31,0.7)',
          border:      `1px solid ${focused ? 'rgba(45,212,191,0.35)' : 'rgba(30,58,82,0.7)'}`,
          boxShadow:   focused ? '0 0 0 3px rgba(45,212,191,0.06)' : 'none',
          color:       '#e2e8f0',
        }}
      />
    </div>
  )
}

function TextAreaField({ label, name, value, onChange, placeholder, required, rows = 5 }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-2xs uppercase tracking-widest"
        style={{ color: focused ? '#2dd4bf' : '#334155', transition: 'color 0.2s' }}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() =>  setFocused(false)}
        className="rounded-xl px-4 py-3 text-sm font-light outline-none
                   transition-all duration-300 resize-none"
        style={{
          background:  focused ? 'rgba(7,17,31,0.9)' : 'rgba(7,17,31,0.7)',
          border:      `1px solid ${focused ? 'rgba(45,212,191,0.35)' : 'rgba(30,58,82,0.7)'}`,
          boxShadow:   focused ? '0 0 0 3px rgba(45,212,191,0.06)' : 'none',
          color:       '#e2e8f0',
        }}
      />
    </div>
  )
}

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
      style={{ background: 'rgba(5,13,24,0.8)' }}
    >

      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(45,212,191,0.04), transparent)',
        }}
      />
      <div
        className="absolute top-0 left-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(45,212,191,0.05), transparent 70%)',
          filter:     'blur(60px)',
          transform:  'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.03), transparent 70%)',
          filter:     'blur(80px)',
          transform:  'translate(30%, 30%)',
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
          <motion.h2
            variants={blurIn}
            className="font-display font-bold tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: '1.1' }}
          >
            Let's Work Together
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            Have a project in mind or want to discuss an opportunity?
            I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Left ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >

            {/* Availability */}
            <motion.div
              variants={fadeLeft}
              whileHover={{
                borderColor: 'rgba(45,212,191,0.22)',
                boxShadow:   '0 0 40px rgba(45,212,191,0.05)',
                transition:  { duration: 0.25 },
              }}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background:     'rgba(45,212,191,0.03)',
                border:         '1px solid rgba(45,212,191,0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.25), transparent)',
                }}
              />

              <div className="flex items-center gap-2.5 mb-3">
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
                  Available Now
                </span>
              </div>

              <p
                className="font-light text-sm leading-relaxed"
                style={{ color: '#64748b' }}
              >
                Open to{' '}
                <span className="text-white font-medium">
                  Android internships
                </span>
                , freelance mobile projects, and open-source
                collaborations.
              </p>

            </motion.div>

            {/* Contact Links */}
            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  variants={fadeLeft}
                  whileHover={{
                    y:           -3,
                    borderColor: 'rgba(45,212,191,0.25)',
                    boxShadow:   '0 8px 32px rgba(0,0,0,0.3)',
                    transition:  { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 rounded-xl p-4 group"
                  style={{
                    background:     'rgba(15,32,53,0.5)',
                    border:         '1px solid rgba(30,58,82,0.7)',
                    backdropFilter: 'blur(16px)',
                  }}
                >

                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center
                               justify-center text-lg flex-shrink-0"
                    style={{
                      background: 'rgba(45,212,191,0.06)',
                      border:     '1px solid rgba(45,212,191,0.12)',
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.icon}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-mono text-2xs uppercase tracking-widest mb-0.5"
                      style={{ color: '#334155' }}
                    >
                      {link.label}
                    </p>
                    <p
                      className="text-sm font-medium truncate transition-colors duration-200
                                 group-hover:text-mint-400"
                      style={{ color: '#94a3b8' }}
                    >
                      {link.display}
                    </p>
                  </div>

                  <motion.svg
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: '#2dd4bf' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, x: -4 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>

                </motion.a>
              ))}
            </div>

          </motion.div>

          {/* ── Right — Form ── */}
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
                background:     'rgba(12,26,46,0.6)',
                border:         '1px solid rgba(30,58,82,0.7)',
                backdropFilter: 'blur(20px)',
              }}
            >

              {/* Top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.25), transparent)',
                }}
              />

              {/* Inner ambient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(45,212,191,0.02), transparent 60%)',
                }}
              />

              {status === 'sent' ? (

                <motion.div
                  className="flex flex-col items-center justify-center py-20 gap-5"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1   }}
                  transition={{ duration: 0.5, ease: ease.outExpo }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center
                               justify-center text-3xl"
                    style={{
                      background: 'rgba(45,212,191,0.08)',
                      border:     '1px solid rgba(45,212,191,0.25)',
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    ✅
                  </motion.div>

                  <motion.p
                    className="font-display text-xl font-bold text-white"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0  }}
                    transition={{ delay: 0.25, ease: ease.outExpo }}
                  >
                    Message Sent!
                  </motion.p>

                  <motion.p
                    className="font-light text-center text-sm max-w-xs"
                    style={{ color: '#64748b' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0  }}
                    transition={{ delay: 0.35, ease: ease.outExpo }}
                  >
                    Your email client should have opened.
                    I'll get back to you soon.
                  </motion.p>

                  <motion.button
                    onClick={() => setStatus('idle')}
                    className="btn-outline mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{  scale: 0.97  }}
                  >
                    Send Another
                  </motion.button>

                </motion.div>

              ) : (

                <motion.form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 relative z-10"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <motion.div variants={fadeUp}>
                      <InputField
                        label="Your Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </motion.div>

                  </div>

                  <motion.div variants={fadeUp}>
                    <TextAreaField
                      label="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      rows={5}
                    />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{  scale: 0.97  }}
                    >
                      {status === 'sending' ? 'Opening...' : 'Send Message'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </motion.button>
                  </motion.div>

                </motion.form>

              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}