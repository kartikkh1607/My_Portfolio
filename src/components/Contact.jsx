import { useState } from 'react'
import { personalInfo } from '../data/portfolio.js'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setStatus('sending')

    const subject = encodeURIComponent(
      `Portfolio Contact from ${form.name}`
    )

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )

    window.open(
      `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    )

    setStatus('sent')

    setForm({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <section id="contact" className="section-padding bg-dark-700">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">

          <p className="section-label">
            04 — contact
          </p>

          <h2 className="section-title">
            Let's Work Together
          </h2>

          <p className="section-sub">
            Have a project in mind or want to discuss an opportunity?
            I'd love to hear from you.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left Side */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Availability Card */}
            <div className="bg-dark-600 border border-mint-400/20 rounded-2xl p-6">

              <div className="flex items-center gap-2 mb-3">

                <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />

                <span className="font-mono text-xs text-mint-400 uppercase tracking-widest">
                  Available Now
                </span>

              </div>

              <p className="text-dark-50 font-light text-sm leading-relaxed">
                Open to{' '}
                <span className="text-white font-medium">
                  Android internships
                </span>
                , freelance mobile projects, and open-source collaborations.
              </p>

            </div>

            {/* Contact Links */}
            <div className="flex flex-col gap-3">

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 bg-dark-600 border border-dark-400
                           rounded-xl p-4 hover:border-mint-400/30 transition-all duration-200
                           hover:-translate-y-0.5 group"
              >

                <div className="w-10 h-10 rounded-xl bg-mint-400/10 border border-mint-400/20
                                flex items-center justify-center text-lg flex-shrink-0">
                  ✉️
                </div>

                <div>

                  <p className="font-mono text-xs text-dark-200 uppercase tracking-wider mb-0.5">
                    Email
                  </p>

                  <p className="text-dark-50 text-sm font-medium group-hover:text-mint-400 transition-colors truncate">
                    {personalInfo.email}
                  </p>

                </div>

              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-dark-600 border border-dark-400
                           rounded-xl p-4 hover:border-mint-400/30 transition-all duration-200
                           hover:-translate-y-0.5 group"
              >

                <div className="w-10 h-10 rounded-xl bg-mint-400/10 border border-mint-400/20
                                flex items-center justify-center text-lg flex-shrink-0">
                  💼
                </div>

                <div>

                  <p className="font-mono text-xs text-dark-200 uppercase tracking-wider mb-0.5">
                    LinkedIn
                  </p>

                  <p className="text-dark-50 text-sm font-medium group-hover:text-mint-400 transition-colors">
                    Kartik Khandelwal
                  </p>

                </div>

              </a>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-dark-600 border border-dark-400
                           rounded-xl p-4 hover:border-mint-400/30 transition-all duration-200
                           hover:-translate-y-0.5 group"
              >

                <div className="w-10 h-10 rounded-xl bg-mint-400/10 border border-mint-400/20
                                flex items-center justify-center text-lg flex-shrink-0">
                  🐙
                </div>

                <div>

                  <p className="font-mono text-xs text-dark-200 uppercase tracking-wider mb-0.5">
                    GitHub
                  </p>

                  <p className="text-dark-50 text-sm font-medium group-hover:text-mint-400 transition-colors">
                    kartikkh1607
                  </p>

                </div>

              </a>

            </div>

          </div>

          {/* Right Side */}
          <div className="lg:col-span-3">

            <div className="bg-dark-600 border border-dark-400 rounded-2xl p-8">

              {status === 'sent' ? (

                <div className="flex flex-col items-center justify-center py-16 gap-4">

                  <div className="w-16 h-16 rounded-full bg-mint-400/10 border border-mint-400/30
                                  flex items-center justify-center text-3xl">
                    ✅
                  </div>

                  <p className="font-display text-xl font-bold text-white">
                    Message Sent!
                  </p>

                  <p className="text-dark-100 font-light text-center text-sm">
                    Your email client should have opened.
                    I'll get back to you soon.
                  </p>

                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline mt-2"
                  >
                    Send Another
                  </button>

                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Name */}
                    <div className="flex flex-col gap-2">

                      <label className="font-mono text-xs text-dark-200 uppercase tracking-wider">
                        Your Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-dark-700 border border-dark-400 rounded-xl px-4 py-3
                                   text-white text-sm font-light placeholder:text-dark-300
                                   focus:outline-none focus:border-mint-400/50 focus:bg-dark-600
                                   transition-all duration-200"
                      />

                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">

                      <label className="font-mono text-xs text-dark-200 uppercase tracking-wider">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="bg-dark-700 border border-dark-400 rounded-xl px-4 py-3
                                   text-white text-sm font-light placeholder:text-dark-300
                                   focus:outline-none focus:border-mint-400/50 focus:bg-dark-600
                                   transition-all duration-200"
                      />

                    </div>

                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">

                    <label className="font-mono text-xs text-dark-200 uppercase tracking-wider">
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      className="bg-dark-700 border border-dark-400 rounded-xl px-4 py-3
                                 text-white text-sm font-light placeholder:text-dark-300
                                 focus:outline-none focus:border-mint-400/50 focus:bg-dark-600
                                 transition-all duration-200 resize-none"
                    />

                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed"
                  >

                    {status === 'sending'
                      ? 'Opening...'
                      : 'Send Message'}

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>

                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}