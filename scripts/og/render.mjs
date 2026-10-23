// Renders the social preview and icon PNGs with headless Chrome:
//   public/og.png              1200x630 from scripts/og/og.html
//   public/favicon-32.png      32x32 from public/favicon.svg
//   public/apple-touch-icon.png 180x180, opaque (iOS rounds the corners itself)
//
//   node scripts/og/render.mjs        (set CHROME_PATH if Chrome isn't found)
//
// Uses the DevTools protocol for exact viewport sizes; a plain
// --window-size has a minimum width of about 500px.
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))
const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const chromePath = CANDIDATES.find((p) => existsSync(p))
if (!chromePath) throw new Error('Chrome not found; set CHROME_PATH')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const profile = mkdtempSync(join(tmpdir(), 'og-render-'))
const port = 9400 + Math.floor(Math.random() * 400)
const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--allow-file-access-from-files', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' })

let targets
for (let i = 0; i < 50 && !targets; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json() } catch { await sleep(200) }
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r))
let id = 0
const pending = new Map()
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id) }
})
const send = (method, params = {}) => new Promise((resolve) => {
  pending.set(++id, resolve)
  ws.send(JSON.stringify({ id, method, params }))
})

async function render(url, width, height, out) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] })
  await send('Page.navigate', { url })
  await sleep(1500) // fonts and the map SVG
  const { data } = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width, height, scale: 1 } })
  writeFileSync(join(root, out), Buffer.from(data, 'base64'))
  console.log(`wrote ${out}`)
}

// A file:// wrapper page (a data: URL can't load the file:// SVG).
function icon(size, opaque) {
  const page = join(profile, `icon-${size}.html`)
  writeFileSync(page,
    `<body style="margin:0;background:${opaque ? '#07111F' : 'transparent'}">` +
    `<img src="${pathToFileURL(join(root, 'public/favicon.svg')).href}" width="${size}" height="${size}" style="display:block">`)
  return pathToFileURL(page).href
}

await send('Page.enable')
await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } })
await render(pathToFileURL(join(root, 'scripts/og/og.html')).href, 1200, 630, 'public/og.png')
await render(icon(32, false), 32, 32, 'public/favicon-32.png')
await render(icon(180, true), 180, 180, 'public/apple-touch-icon.png')

ws.close()
const exited = new Promise((r) => chrome.once('exit', r))
chrome.kill()
await exited
await sleep(500) // Chrome's child processes release the profile a moment later on Windows
try {
  rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 })
} catch {
  console.warn(`could not remove temp profile ${profile}`)
}
