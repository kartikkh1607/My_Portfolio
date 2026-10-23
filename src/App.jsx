import { LazyMotion, MotionConfig } from 'framer-motion'
import Background from './components/Background.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import EarlierWork from './components/EarlierWork.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Framer Motion's animation features load in their own small chunk after
// hydration; the `m` components render their start state until then.
const motionFeatures = () => import('./motion/features.js').then((mod) => mod.default)

export default function App() {
  return (
    <LazyMotion features={motionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-bg px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Background />
        <div className="relative z-10">
          <Navbar />
          <main id="main" className="mx-auto max-w-page px-4 sm:px-6">
            <Hero />
            <Projects />
            <Skills />
            <EarlierWork />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
