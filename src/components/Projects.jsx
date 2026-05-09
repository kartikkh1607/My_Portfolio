import { projects } from '../data/portfolio.js'

export default function Projects() {
  return (
    <section id="projects" className="section-padding max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-16">

        <p className="section-label">
          03 — projects
        </p>

        <h2 className="section-title">
          Things I've Built
        </h2>

        <p className="section-sub">
          A selection of real Android projects — each built with clean architecture,
          modern Jetpack libraries, and attention to detail.
        </p>

      </div>

      {/* Projects Grid */}
      <div className="flex flex-col gap-8">

        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-dark-600 border border-dark-400 rounded-2xl p-8
                       hover:border-mint-400/30 hover:shadow-lg hover:shadow-dark-900/50
                       transition-all duration-300 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center group"
          >

            {/* Left */}
            <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4">

              <span className="font-mono text-5xl font-bold text-dark-400 group-hover:text-mint-400/20 transition-colors">
                0{index + 1}
              </span>

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color}
                            flex items-center justify-center text-2xl shadow-md`}
              >
                {project.icon}
              </div>

            </div>

            {/* Middle */}
            <div className="lg:col-span-3 flex flex-col gap-4">

              <div>

                <p className="font-mono text-xs text-mint-400 uppercase tracking-widest mb-1">
                  {project.subtitle}
                </p>

                <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                  {project.name}
                </h3>

              </div>

              <p className="text-dark-50 font-light leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">

                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="tag"
                  >
                    {t}
                  </span>
                ))}

              </div>

            </div>

            {/* Right */}
            <div className="lg:col-span-1 flex lg:flex-col gap-3 justify-start lg:items-end">

              {/* GitHub Button */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-dark-400 text-dark-100
                           font-mono text-xs px-4 py-2.5 rounded-xl hover:border-mint-400/50
                           hover:text-mint-400 transition-all duration-200 hover:-translate-y-0.5"
              >

                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                           0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                           -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                           .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                           -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004
                           1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7
                           1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338
                           -.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>

                View Code

              </a>

              {/* Live Demo Button */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-mint-400 text-dark-900
                           font-mono text-xs px-4 py-2.5 rounded-xl hover:bg-mint-300
                           transition-all duration-200 hover:-translate-y-0.5"
              >

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

                Live Demo

              </a>

            </div>

          </div>
        ))}

      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">

        <p className="text-dark-200 font-light mb-4">
          Want to see more? All my projects are on GitHub.
        </p>

        <a
          href="https://github.com/kartikkh1607"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >

          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                     0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                     -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                     .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                     -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004
                     1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7
                     1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338
                     -.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>

          View All on GitHub

        </a>

      </div>

    </section>
  )
}