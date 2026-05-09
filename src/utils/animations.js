// Reusable Framer Motion variants — import these in every component

export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const fadeLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.1,
      delayChildren:    0.2,
    }
  }
}

export const staggerFast = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren:   0.1,
    }
  }
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export const cardHover = {
  rest:  { scale: 1,    y: 0,  transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.3, ease: 'easeOut' } }
}

export const springTransition = {
  type:      'spring',
  stiffness: 300,
  damping:   30,
}

export const smoothTransition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94]
}

// Viewport settings — reuse in every whileInView
export const viewport = {
  once:   true,
  margin: '-80px'
}