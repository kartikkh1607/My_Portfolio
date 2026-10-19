import { personalInfo } from '../data/portfolio.js'

export default function Navbar() {
  return (
    <header className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-6">
      <a href="#top" className="font-semibold text-inherit no-underline">
        {personalInfo.name}
      </a>
      <nav aria-label="Main">
        <ul className="flex gap-5">
          <li><a href="#projects">Projects</a></li>
          <li><a href={personalInfo.resume} download>Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}
