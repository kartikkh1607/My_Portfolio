// ─── EASING CURVES ─────────────────────────────────────────────
export const ease = {
  spring:  [0.25, 0.46, 0.45, 0.94],
  outExpo: [0.16, 1,    0.3,  1   ],
  inExpo:  [0.7,  0,    0.84, 1   ],
  smooth:  [0.4,  0,    0.2,  1   ],
}

// ─── SPRING CONFIG ──────────────────────────────────────────────
export const spring = {
  gentle: { type: 'spring', stiffness: 200, damping: 30 },
  medium: { type: 'spring', stiffness: 300, damping: 30 },
  snappy: { type: 'spring', stiffness: 400, damping: 35 },
  bouncy: { type: 'spring', stiffness: 500, damping: 25 },
}

// ─── VIEWPORT ───────────────────────────────────────────────────
export const viewport = { once: true, margin: '-80px' }
export const viewportEager = { once: true, margin: '-40px' }

// ─── FADE VARIANTS ──────────────────────────────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.outExpo },
  },
}

export const fadeDown = {
  hidden:  { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.outExpo },
  },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const fadeLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: ease.outExpo },
  },
}

export const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: ease.outExpo },
  },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: ease.outExpo },
  },
}

export const scaleInSpring = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring.gentle,
  },
}

// ─── CONTAINER VARIANTS ─────────────────────────────────────────
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren:   0.15,
    },
  },
}

export const staggerFast = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren:   0.1,
    },
  },
}

export const staggerSlow = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren:   0.2,
    },
  },
}

// ─── HOVER PRESETS ──────────────────────────────────────────────
export const hoverLift = {
  rest:  { y: 0,  scale: 1,    transition: { duration: 0.3, ease: ease.spring } },
  hover: { y: -6, scale: 1.02, transition: { duration: 0.3, ease: ease.spring } },
}

export const hoverScale = {
  rest:  { scale: 1,    transition: { duration: 0.25, ease: ease.spring } },
  hover: { scale: 1.05, transition: { duration: 0.25, ease: ease.spring } },
}

export const hoverGlow = (color = 'rgba(45,212,191,0.2)') => ({
  rest:  { boxShadow: '0 0 0px transparent', transition: { duration: 0.3 } },
  hover: { boxShadow: `0 0 30px ${color}`,   transition: { duration: 0.3 } },
})

// ─── SECTION REVEAL ─────────────────────────────────────────────
export const sectionReveal = {
  hidden:  { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: ease.outExpo,
      staggerChildren: 0.12,
    },
  },
}

// ─── TEXT REVEAL ────────────────────────────────────────────────
export const textReveal = {
  hidden:  { opacity: 0, y: 20, skewY: 2  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.6, ease: ease.outExpo },
  },
}

// ─── CARD VARIANTS ──────────────────────────────────────────────
export const cardReveal = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: ease.outExpo },
  },
}

// ─── BLUR IN ────────────────────────────────────────────────────
export const blurIn = {
  hidden:  { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, ease: ease.outExpo },
  },
}