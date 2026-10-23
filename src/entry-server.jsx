// Build-time render of the whole page (CLAUDE.md §7). scripts/prerender.mjs
// injects the result into dist/index.html, so crawlers, link previews, ATS
// parsers and no-JS visitors get the full content. Client-only pieces (the 3D
// map, theme icon) start in their static form and switch after hydration.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
