import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../data/portfolio.js'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const formEnabled = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

const external = { target: '_blank', rel: 'noopener noreferrer' }

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
    <button type="button" onClick={copy} className="btn btn-secondary">
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
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

  const field =
    'mt-1 block w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-ink focus-visible:border-cobalt'

  return (
    <form onSubmit={handleSubmit} className="panel grid gap-5 p-5 sm:p-7" aria-label="Send a message">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-medium">
          Name
          <input name="name" value={form.name} onChange={handleChange} required autoComplete="name" className={field} />
        </label>
        <label className="font-medium">
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="font-medium">
        Message
        <textarea name="message" rows={5} value={form.message} onChange={handleChange} required className={`${field} resize-y`} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
          {status === 'sending' ? 'Sending' : 'Send message'}
        </button>
        <p role="status" className="text-sm">
          {status === 'sent' && "Thanks, your message was sent. I'll reply by email."}
          {status === 'error' && `Something went wrong. Please email me at ${personalInfo.email}.`}
        </p>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grid gap-10 py-16 lg:grid-cols-[1fr_1.3fr] lg:py-24">
      <div>
        <h2 id="contact-title" className="text-step-3">Contact</h2>
        <p className="mt-4 sm:text-step-1">
          <a href={`mailto:${personalInfo.email}`} className="wrap-anywhere">{personalInfo.email}</a>
        </p>
        <div className="mt-4"><CopyEmail /></div>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          <li><a href={personalInfo.linkedin} {...external}>LinkedIn</a></li>
          <li><a href={personalInfo.github} {...external}>GitHub</a></li>
          <li><a href={personalInfo.leetcode} {...external}>LeetCode</a></li>
        </ul>
      </div>
      {formEnabled && <ContactForm />}
    </section>
  )
}
