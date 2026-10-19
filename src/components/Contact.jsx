import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../data/portfolio.js'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const formEnabled = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked; the mailto link still works.
    }
  }

  return (
    <button type="button" onClick={copy} className="rounded-md border border-[#d5dae3] px-3 py-1 text-sm">
      {copied ? 'Copied' : 'Copy email'}
    </button>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const field = 'mt-1 block w-full rounded-md border border-[#d5dae3] px-3 py-2'

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid max-w-[560px] gap-4">
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required autoComplete="name" className={field} />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" className={field} />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} value={form.message} onChange={handleChange} required className={field} />
      </label>
      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-md bg-[#2b4acb] px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending' : 'Send message'}
        </button>
      </div>
      <p role="status" className="text-sm">
        {status === 'sent' && "Thanks, your message was sent. I'll reply by email."}
        {status === 'error' && `Something went wrong. Please email me at ${personalInfo.email}.`}
      </p>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-12">
      <h2 id="contact-title" className="text-3xl font-bold">Contact</h2>
      <p className="mt-4 flex flex-wrap items-center gap-3">
        <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        <CopyEmail />
      </p>
      <p className="mt-2 flex flex-wrap gap-4">
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
      {formEnabled && <ContactForm />}
    </section>
  )
}
