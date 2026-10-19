import { personalInfo } from '../data/portfolio.js'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1120px] px-4 py-8 text-sm text-[#5e6779] sm:px-6">
      <p>{personalInfo.name}, {personalInfo.education.degree}, {personalInfo.education.school} ({personalInfo.education.years})</p>
    </footer>
  )
}
