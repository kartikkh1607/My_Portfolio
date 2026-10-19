import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

function resolvedTheme() {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  // null until mounted, so server and client render the same markup.
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    setTheme(resolvedTheme())
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setTheme(resolvedTheme())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = resolvedTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage blocked; the choice still applies for this visit.
    }
    setTheme(next)
  }

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : 'Toggle color theme'}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted hover:text-ink"
    >
      {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  )
}
