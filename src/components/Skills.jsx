import { skills } from '../data/portfolio.js'

const iconMap = {
  Code2:      '💻',
  Smartphone: '📱',
  Layers:     '📦',
  Wrench:     '🔧',
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-dark-700">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label">02 — skills</p>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-sub">
            Technologies and tools I use to design, build, and ship Android applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="bg-dark-600 border border-dark-400 rounded-2xl p-6
                         hover:border-mint-400/30 hover:shadow-md hover:-translate-y-1
                         transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-mint-400/10 border border-mint-400/20
                                flex items-center justify-center text-lg">
                  {iconMap[group.icon]}
                </div>
                <h3 className="font-display font-bold text-white text-sm tracking-tight">
                  {group.category}
                </h3>
              </div>

              {/* Skills List */}
              <ul className="flex flex-col gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-dark-50 font-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-mint-400 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-dark-600 border border-dark-400 rounded-2xl p-8
                        flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-xl text-white mb-1">
              Always learning, always building.
            </p>
            <p className="text-dark-100 font-light text-sm">
              Currently exploring Kotlin Multiplatform, AWS Cloud, and advanced system design.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM', 'Hilt'].map((item) => (
              <span
                key={item}
                className="bg-mint-400/10 border border-mint-400/20 text-mint-400
                           font-mono text-xs px-3 py-1.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}