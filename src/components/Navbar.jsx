import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      setScrolled(window.scrollY > 30)

      const sections = ['about', 'skills', 'projects', 'contact']

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)

        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(id)
          return
        }
      }

      setActiveSection('')
    }

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-800/70 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-dark-900/50'
          : 'bg-transparent'
      }`}
    >

      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <motion.a
          href="#"
          className="font-display font-bold text-xl tracking-tight text-white hover:text-mint-400 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >

          KK<span className="text-mint-400">.</span>

        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">

          {links.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1)

            return (
              <li key={label}>

                <a
                  href={href}
                  className="relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 rounded-lg block"
                  style={{
                    color: isActive
                      ? '#2dd4bf'
                      : '#7fb3cc',
                  }}
                >

                  {/* Active Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(45,212,191,0.08)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {label}
                  </span>

                </a>

              </li>
            )
          })}

        </ul>

        {/* Resume Button */}
        <motion.a
          href={`mailto:${personalInfo.email}?subject=Resume Request`}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold
                     px-4 py-2 rounded-lg transition-all duration-200"
          style={{
            background:
              'linear-gradient(135deg, #2dd4bf, #14b8a6)',
            color: '#050d18',
            boxShadow:
              '0 0 20px rgba(45,212,191,0.2)',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              '0 0 30px rgba(45,212,191,0.4)',
          }}
          whileTap={{ scale: 0.96 }}
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

        </motion.a>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >

          <motion.span
            animate={
              menuOpen
                ? { rotate: 45, y: 8 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.3 }}
            className="block w-5 h-0.5 bg-white origin-center"
          />

          <motion.span
            animate={
              menuOpen
                ? { opacity: 0, x: -10 }
                : { opacity: 1, x: 0 }
            }
            transition={{ duration: 0.3 }}
            className="block w-5 h-0.5 bg-white"
          />

          <motion.span
            animate={
              menuOpen
                ? { rotate: -45, y: -8 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.3 }}
            className="block w-5 h-0.5 bg-white origin-center"
          />

        </motion.button>

      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>

        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(7,17,31,0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom:
                '1px solid rgba(45,212,191,0.1)',
            }}
          >

            <motion.div
              className="px-6 py-4 flex flex-col gap-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                  },
                },
              }}
            >

              {links.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -16,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.3,
                      },
                    },
                  }}
                  className="text-dark-100 hover:text-mint-400 font-medium
                             py-3 px-3 rounded-lg transition-colors"
                  style={{
                    borderBottom:
                      '1px solid rgba(30,58,82,0.4)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >

                  {label}

                </motion.a>
              ))}

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </motion.header>
  )
}