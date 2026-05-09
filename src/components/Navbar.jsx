import { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolio.js'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['about', 'skills', 'projects', 'contact']

      for (const id of sections) {
        const el = document.getElementById(id)

        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id)
        }
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-800/90 backdrop-blur-md border-b border-dark-400 shadow-lg shadow-dark-900/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight text-white hover:text-mint-400 transition-colors"
        >
          KK<span className="text-mint-400">.</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`font-sans text-sm font-medium transition-colors duration-200 relative group ${
                  activeSection === href.slice(1)
                    ? 'text-mint-400'
                    : 'text-dark-100 hover:text-white'
                }`}
              >
                {label}

                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-mint-400 transition-all duration-300 ${
                    activeSection === href.slice(1)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Resume Button */}
        <a
          href={`mailto:${personalInfo.email}?subject=Resume Request`}
          className="hidden md:inline-flex items-center gap-2 bg-mint-400 text-dark-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-mint-300 transition-all duration-200 hover:-translate-y-0.5"
        >
          Resume

          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />

          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />

          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-dark-700/95 backdrop-blur-md border-b border-dark-400 px-6 py-4 flex flex-col gap-4">

          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-dark-100 hover:text-mint-400 font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}

        </div>
      </div>

    </header>
  )
}