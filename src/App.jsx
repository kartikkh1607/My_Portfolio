import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar        from './components/Navbar.jsx'
import Hero          from './components/Hero.jsx'
import About         from './components/About.jsx'
import Timeline      from './components/Timeline.jsx'
import Skills        from './components/Skills.jsx'
import Projects      from './components/Projects.jsx'
import Contact       from './components/Contact.jsx'
import Footer        from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'


// ── Back-to-Top Button ────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.7, y: 16  }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full
                     flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
            boxShadow:  '0 0 24px rgba(45,212,191,0.35)',
            color:      '#050d18',
          }}
          whileHover={{
            scale:     1.12,
            boxShadow: '0 0 36px rgba(45,212,191,0.55)',
          }}
          whileTap={{ scale: 0.92 }}
          aria-label="Back to top"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      e.preventDefault()
      const id = target.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <main className="relative overflow-x-hidden">

      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}