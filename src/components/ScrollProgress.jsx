import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping:   30,
    restDelta: 0.001
  })

  return (
    <motion.div
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2dd4bf, #5eead4, #2dd4bf)',
      }}
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
    />
  )
}