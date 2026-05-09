import { motion } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp, viewport } from '../utils/animations.js'

const skillIcons = [
  {
    name: 'Kotlin',
    color: '#7F52FF',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M2 2h10.83L2 13.09V2zm0 20l10.94-11L24 22H2zm12.16-20H24L12.16 12.39 6.36 6.47 12.16 2z"
          fill="#7F52FF"/>
      </svg>
    ),
  },
  {
    name: 'Android',
    color: '#3DDC84',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#3DDC84">
        <path d="M17.523 15.341a.75.75 0 10-.002-1.5.75.75 0 00.002 1.5zm-11.046 0a.75.75 0 10-.002-1.5.75.75 0 00.002 1.5zM12 2.25C6.615 2.25 2.25 6.615 2.25 12c0 2.568.964 4.913 2.548 6.688L3.22 20.267a.75.75 0 001.06 1.06l1.58-1.578A9.712 9.712 0 0012 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z"/>
        <path d="M8.25 9.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" fill="#fff"/>
        <path d="M3.5 7.5L5 5m16 2.5L19.5 5M8.5 5L9.5 3M15.5 5L14.5 3" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Jetpack Compose',
    color: '#4285F4',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"
          fill="#FFCA28"/>
      </svg>
    ),
  },
  {
    name: 'Room DB',
    color: '#4285F4',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M4 10v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4" stroke="#4285F4" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Retrofit',
    color: '#48A999',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
          stroke="#48A999" strokeWidth="1.5"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
          stroke="#48A999" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Hilt / DI',
    color: '#E91E63',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="#E91E63" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'MVVM',
    color: '#FF6B35',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <rect x="2" y="3" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="9" y="3" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="16" y="3" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="5.5" y="14" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="12.5" y="14" width="6" height="5" rx="1" stroke="#FF6B35" strokeWidth="1.5"/>
        <path d="M5 8v3h14V8M8.5 11v3M15.5 11v3" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Kotlin Flow',
    color: '#7F52FF',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M5 12c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7"
          stroke="#7F52FF" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 12c0 3.866 3.134 7 7 7" stroke="#7F52FF" strokeWidth="1.5"
          strokeLinecap="round" strokeDasharray="2 2"/>
        <path d="M12 8v4l3 3" stroke="#7F52FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Material 3',
    color: '#6750A4',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#6750A4" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" fill="#6750A4"/>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#6750A4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Git & GitHub',
    color: '#F05032',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#F05032">
        <path d="M11.998 1a10.998 10.998 0 100 22 10.998 10.998 0 000-22zm6.878 16.967c-.344.207-.79.11-1.007-.23-.245-.374-.476-.76-.697-1.143-.43-.745-.886-.908-1.879-.683a7.38 7.38 0 01-1.53.162c-2.464 0-4.36-1.172-5.477-3.37-.527-1.046-.733-2.176-.668-3.34.113-1.982 1.065-3.51 2.739-4.563 1.694-1.066 3.51-1.134 5.336-.35.891.384 1.6.988 2.12 1.812.574.908.78 1.91.64 2.98-.082.627-.29 1.21-.63 1.748a.764.764 0 00.086.97c.467.5.898 1.031 1.326 1.564.22.274.307.593.248.91-.06.325-.25.594-.507.752z"/>
      </svg>
    ),
  },
  {
    name: 'AWS Cloud',
    color: '#FF9900',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#FF9900">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 01-.208.072c-.08 0-.16-.04-.24-.112a2.47 2.47 0 01-.288-.376 6.18 6.18 0 01-.248-.471c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104-.296.072-.584.16-.864.272-.128.056-.224.088-.28.104-.056.016-.096.024-.128.024-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.597.597 0 01.224-.168c.28-.144.616-.264 1.008-.36a4.86 4.86 0 011.248-.144c.952 0 1.648.216 2.096.648.44.432.664 1.088.664 1.968v2.592zm-3.24 1.212c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.192.08-.424.08-.696v-.336a6.66 6.66 0 00-.736-.136 6.02 6.02 0 00-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.92 0 .376.096.656.296.848.192.2.472.296.84.296zm6.44.88c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.48 5.88 1.376-5.88c.04-.16.088-.264.152-.312a.553.553 0 01.32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.392 5.952 1.528-5.952c.048-.16.104-.264.16-.312a.52.52 0 01.312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.137 1.137 0 01-.056.2l-2.128 6.176c-.048.16-.104.264-.168.312a.52.52 0 01-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32L12.96 6.764l-1.368 5.864c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.688zm11.176.216c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 01-.048-.224v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.192-.264a.86.86 0 00.416-.744.777.777 0 00-.208-.552c-.14-.152-.4-.288-.776-.416l-1.112-.344c-.562-.176-.976-.44-1.232-.792a1.897 1.897 0 01-.384-1.152c0-.332.072-.624.216-.88.144-.256.336-.48.576-.664.24-.184.512-.32.832-.416.32-.096.656-.136 1.008-.136.176 0 .36.008.536.032.184.024.352.056.512.096.152.032.296.072.432.12.136.048.24.096.312.144a.65.65 0 01.208.192.45.45 0 01.056.232v.376c0 .168-.064.256-.184.256a.83.83 0 01-.304-.096 3.652 3.652 0 00-1.52-.312c-.472 0-.84.072-1.096.224-.256.152-.384.384-.384.704 0 .216.08.4.24.552.16.152.456.304.88.44l1.088.344c.554.176.952.424 1.192.744.24.32.354.688.354 1.096 0 .34-.068.648-.2.92-.14.272-.328.512-.576.704-.248.2-.544.344-.888.44-.36.104-.752.152-1.176.152z"/>
      </svg>
    ),
  },
  {
    name: 'Android Studio',
    color: '#3DDC84',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#3DDC84" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 2v20M2 7l10 5 10-5" stroke="#3DDC84" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#3776AB',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#3776AB">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.032v-2.867s-.109-3.403 3.35-3.403h5.771s3.24.052 3.24-3.13V3.327S18.301 0 11.914 0zm-3.21 1.922a1.04 1.04 0 11-.001 2.079 1.04 1.04 0 01.001-2.08z"/>
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.131S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.032v2.867s.109 3.403-3.35 3.403H9.444s-3.24-.052-3.24 3.13v5.205S5.699 24 12.086 24zm3.21-1.922a1.04 1.04 0 110-2.079 1.04 1.04 0 010 2.08z"
          fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    name: 'Java',
    color: '#ED8B00',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#ED8B00">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.653 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.981.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
      </svg>
    ),
  },
  {
    name: 'C++',
    color: '#00599C',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#00599C" fillOpacity="0.15"
          stroke="#00599C" strokeWidth="1.5" strokeLinejoin="round"/>
        <text x="6" y="16" fill="#00599C" fontSize="8" fontWeight="bold" fontFamily="monospace">C++</text>
      </svg>
    ),
  },
  {
    name: 'DSA',
    color: '#2dd4bf',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
        <path d="M12 3v18M3 12h18" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" stroke="#2dd4bf" strokeWidth="1.5"/>
        <circle cx="12" cy="3"  r="1.5" fill="#2dd4bf"/>
        <circle cx="12" cy="21" r="1.5" fill="#2dd4bf"/>
        <circle cx="3"  cy="12" r="1.5" fill="#2dd4bf"/>
        <circle cx="21" cy="12" r="1.5" fill="#2dd4bf"/>
      </svg>
    ),
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ background: 'rgba(5,13,24,0.8)' }}
    >

      {/* Ambient orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[300px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.04), transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translateY(40%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="section-label">
            02 — skills
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            What I Work With
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            Technologies and tools I use to design, build,
            and ship Android applications.
          </motion.p>
        </motion.div>

        {/* Icon Grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {skillIcons.map((skill) => (
            <motion.div
              key={skill.name}
              variants={scaleIn}
              whileHover={{
                y: -6,
                scale: 1.05,
                borderColor: `${skill.color}40`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${skill.color}15`,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center justify-center gap-3
                         rounded-2xl p-5 cursor-default relative overflow-hidden"
              style={{
                background: 'rgba(15,32,53,0.6)',
                border: '1px solid rgba(30,58,82,0.8)',
                backdropFilter: 'blur(16px)',
                aspectRatio: '1',
              }}
            >
              {/* Hover glow bg */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
                style={{
                  background: `radial-gradient(circle at center, ${skill.color}10, transparent 70%)`,
                }}
                whileHover={{ opacity: 1 }}
              />

              {/* Icon */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ duration: 0.2 }}
              >
                {skill.svg}
              </motion.div>

              {/* Label */}
              <p
                className="relative z-10 font-mono text-xs text-center leading-tight"
                style={{ color: '#7fb3cc' }}
              >
                {skill.name}
              </p>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row
                     items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: 'rgba(15,32,53,0.5)',
            border: '1px solid rgba(30,58,82,0.8)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, rgba(45,212,191,0.04), transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <p className="font-display font-bold text-xl text-white mb-1">
              Always learning, always building.
            </p>
            <p className="font-light text-sm" style={{ color: '#7fb3cc' }}>
              Currently exploring Kotlin Multiplatform, AWS Cloud,
              and advanced system design.
            </p>
          </div>
          <motion.div
            className="flex flex-wrap gap-2 justify-center md:justify-end relative z-10"
          >
            {['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM', 'Hilt'].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.2 + i * 0.07 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="font-mono text-xs px-3 py-1.5 rounded-full cursor-default"
                style={{
                  background: 'rgba(45,212,191,0.08)',
                  border: '1px solid rgba(45,212,191,0.2)',
                  color: '#2dd4bf',
                }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}