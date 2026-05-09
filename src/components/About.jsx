import { personalInfo } from "../data/portfolio.js";

const highlights = [
  { icon: "🎓", label: "College", value: personalInfo.college },
  { icon: "📚", label: "Branch", value: personalInfo.branch },
  { icon: "📅", label: "Year", value: personalInfo.year },
  { icon: "📍", label: "Location", value: personalInfo.city },
];

const interests = [
  "Clean Architecture",
  "Material You Design",
  "Open Source",
  "DSA & Problem Solving",
  "UI/UX & Animations",
  "Hackathons",
  "AWS Cloud",
  "Kotlin Multiplatform",
];

export default function About() {
  return (
    <section id="about" className="section-padding max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <p className="section-label">01 — about me</p>

        <h2 className="section-title">The Person Behind the Code</h2>

        <p className="section-sub">
          A little bit about who I am, where I study, and what drives me to
          build.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side */}
        <div className="flex flex-col gap-8">
          {/* Bio */}
          <div>
            <p className="text-dark-50 text-lg font-light leading-relaxed mb-4">
              {personalInfo.about}
            </p>

            <p className="text-dark-100 font-light leading-relaxed">
              Currently in my{" "}
              <span className="text-mint-400 font-medium">
                2nd year at KIET Group of Institutions
              </span>
              , I'm actively seeking internships and freelance opportunities
              where I can contribute, learn from real-world problems, and grow
              as an Android engineer.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [grid-auto-rows:1fr]">
            {highlights.map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 bg-dark-600 border border-dark-400 rounded-xl p-4 hover:border-mint-400/30 transition-colors duration-200 h-full"
              >
                <span className="text-xl mt-0.5">{icon}</span>

                <div>
                  <p className="font-mono text-xs text-dark-200 uppercase tracking-wider mb-0.5">
                    {label}
                  </p>

                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Projects Button */}
            <a href="#projects" className="btn-primary">
              See My Projects
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* LinkedIn Button */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              LinkedIn
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6">
          {/* Status Card */}
          <div className="card border-mint-400/20 bg-mint-400/5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-mint-400 animate-pulse" />

              <span className="font-mono text-xs text-mint-400 uppercase tracking-widest">
                Currently Available
              </span>
            </div>

            <p className="text-dark-50 font-light text-sm leading-relaxed">
              Actively looking for{" "}
              <span className="font-medium text-white">
                Android Developer internships
              </span>{" "}
              and freelance mobile app projects. I bring clean code, modern
              architecture, and fast delivery.
            </p>

            <div className="mt-4 pt-4 border-t border-dark-400 flex flex-wrap gap-2">
              <span className="tag">Internship</span>

              <span className="tag">Freelance</span>

              <span className="tag">Open Source</span>

              <span className="tag">Hackathons</span>
            </div>
          </div>

          {/* Interests */}
          <div className="card">
            <p className="font-mono text-xs text-dark-200 uppercase tracking-widest mb-4">
              interests &amp; goals
            </p>

            <div className="flex flex-wrap gap-2">
              {interests.map((item) => (
                <span
                  key={item}
                  className="tag hover:border-mint-400/40 hover:text-mint-400 transition-colors duration-200 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "9+", label: "Repositories" },
              { num: "3+", label: "Projects" },
              { num: "2nd", label: "Year" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="card text-center hover:border-mint-400/30 transition-colors"
              >
                <span className="font-display text-2xl font-bold text-gradient block">
                  {num}
                </span>

                <span className="font-mono text-xs text-dark-200 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
