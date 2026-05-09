import { useEffect } from 'react'
import Navbar        from './components/Navbar.jsx'
import Hero          from './components/Hero.jsx'
import About         from './components/About.jsx'
import Skills        from './components/Skills.jsx'
import Projects      from './components/Projects.jsx'
import Contact       from './components/Contact.jsx'
import Footer        from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

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
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}