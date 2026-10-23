import { useEffect, useState } from 'react'

const TYPE_MS = 42
const ERASE_MS = 22
const HOLD_MS = 2200

// "builds RAG systems" -> "writes evals" -> ... typed out like a streamed
// LLM response. Screen readers get the full list once; the animated copy is
// aria-hidden. Reduced motion shows the whole list, still.
export default function RoleLine({ name, roles }) {
  const [text, setText] = useState(roles[0])
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true)
      return
    }
    let timer = 0
    let i = 0
    let shown = roles[0]
    const tick = (fn, ms) => (timer = setTimeout(fn, ms))

    const erase = () => {
      if (shown.length === 0) {
        i = (i + 1) % roles.length
        return tick(type, 180)
      }
      shown = shown.slice(0, -1)
      setText(shown)
      tick(erase, ERASE_MS)
    }
    const type = () => {
      const target = roles[i]
      if (shown.length === target.length) return tick(erase, HOLD_MS)
      // a token or two at a time, like a stream
      shown = target.slice(0, shown.length + 1 + (Math.random() < 0.35 ? 1 : 0))
      setText(shown)
      tick(type, TYPE_MS + Math.random() * 40)
    }
    tick(erase, HOLD_MS)
    return () => clearTimeout(timer)
  }, [roles])

  return (
    <p className="font-display text-step-1 font-semibold text-ink sm:text-step-2">
      <span className="sr-only">
        {name} {roles.slice(0, -1).join(', ')} and {roles.at(-1)}.
      </span>
      {/* While typing, contain the line so each character relayouts only this box. */}
      <span
        aria-hidden="true"
        className={`inline-flex items-center ${still ? '' : 'h-[1.4em] whitespace-nowrap [contain:layout_paint]'}`}
      >
        <span className="mr-2 text-cyan">&gt;</span>
        {still ? (
          <span className="whitespace-normal">{roles.join(' · ')}</span>
        ) : (
          <>
            <span className="text-gradient">{text}</span>
            <span className="caret" />
          </>
        )}
      </span>
    </p>
  )
}
