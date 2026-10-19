import { personalInfo } from '../data/portfolio.js'

const navLink = 'inline-flex min-h-11 items-center px-1.5 text-[0.9375rem] text-muted no-underline transition-colors hover:text-ink sm:px-2 sm:text-base'

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-[rgba(7,17,31,0.55)] backdrop-blur-md">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-3 px-4 py-1 sm:gap-x-6 sm:px-6 sm:py-2">
        <a href="#top" className="font-display text-base font-bold whitespace-nowrap text-ink no-underline sm:text-step-1">
          {personalInfo.name}
        </a>
        <nav aria-label="Main" className="-mx-1.5 sm:-mx-2">
          <ul className="flex items-center">
            <li><a href="#projects" className={navLink}>Projects</a></li>
            {/* Phones: no room on one line; the hero's resume button is right below. */}
            <li className="hidden sm:list-item"><a href={personalInfo.resume} download className={navLink}>Resume</a></li>
            <li><a href="#contact" className={navLink}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
