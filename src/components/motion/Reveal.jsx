import { forwardRef } from 'react'
import { m } from 'framer-motion'

// Scroll reveals (Framer Motion whileInView). A <Reveal> starts its own
// animation and its <RevealItem> descendants' the first time it scrolls into
// view; items follow one after another. The prerendered HTML carries the
// hidden start state; index.css shows everything without JS or with reduced
// motion (the [data-reveal] rules).
//
// Glass panels animate their own opacity (never a wrapper's): an ancestor
// with opacity < 1 would cut the panel's backdrop blur until it finished.
export const EASE = [0.22, 1, 0.36, 1]

export const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export const card = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

export const Reveal = forwardRef(function Reveal({ as = 'div', amount = 0.12, variants = group, children, ...rest }, ref) {
  const Tag = m[as]
  return (
    <Tag
      ref={ref}
      data-reveal=""
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export function RevealItem({ as = 'div', variants = item, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag data-reveal="" variants={variants} {...rest}>
      {children}
    </Tag>
  )
}
