import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import EarlierWork from './components/EarlierWork.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <Hero />
        <Projects />
        <Skills />
        <EarlierWork />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
