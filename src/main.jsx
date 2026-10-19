import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/bricolage-grotesque/latin-600.css'
import '@fontsource/bricolage-grotesque/latin-700.css'
import App from './App.jsx'
import './styles/index.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it.
// `npm run dev` serves the bare template, so render from scratch there.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
