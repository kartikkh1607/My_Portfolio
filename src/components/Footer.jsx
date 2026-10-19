import { personalInfo } from '../data/portfolio.js'

export default function Footer() {
  const { education } = personalInfo
  return (
    <footer className="mx-auto max-w-page px-4 sm:px-6">
      <div className="flex flex-wrap justify-between gap-2 border-t border-line py-8 text-sm text-muted">
        <p>{personalInfo.name}, {education.degree}, {education.school}, {education.years}</p>
        <p><a href={personalInfo.resume} download>Resume (PDF)</a></p>
      </div>
    </footer>
  )
}
