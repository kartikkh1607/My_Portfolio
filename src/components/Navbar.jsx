import { personalInfo } from '../data/portfolio.js'
import ThemeToggle from './ThemeToggle.jsx'

const navLink = 'inline-flex min-h-11 items-center px-2 text-ink no-underline hover:underline'

export default function Navbar() {
  return (
    <header className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 px-4 py-3 sm:px-6">
      <a href="#top" className="font-display text-step-1 font-semibold text-ink no-underline">
        {personalInfo.name}
      </a>
      <nav aria-label="Main" className="-mx-2 flex items-center">
        <ul className="flex items-center">
          <li><a href="#projects" className={navLink}>Projects</a></li>
          <li><a href={personalInfo.resume} download className={navLink}>Resume</a></li>
          <li><a href="#contact" className={navLink}>Contact</a></li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
