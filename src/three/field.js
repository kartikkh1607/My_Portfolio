// Ambient "latent space" around the real embedding map. Decorative: these
// points are generated, not embedded. Two populations:
//   haze: soft clouds around the 98 real points, in map coordinates, so they
//         rotate with the map and light up with their project's cluster
//   deep: a wide field of faint points in world space that the camera flies
//         through while you scroll
// Deterministic (seeded), so every visit sees the same sky.

export const PROJECTS = ['yt-lecture-rag', 'hiremeai', 'mealtime', 'dsa-tracker']

const DEEP_COLORS = ['#A78BFA', '#22D3EE', '#818CF8', '#67E8F9', '#C4B5FD', '#CBD5E1']

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function allocate(n) {
  return {
    count: n,
    position: new Float32Array(n * 3),
    color: new Float32Array(n * 3),
    size: new Float32Array(n),
    alpha: new Float32Array(n),
    seed: new Float32Array(n),
    group: new Float32Array(n), // haze: project index 0-3, or -1; deep: -2
  }
}

export function makeHaze(points, clusterColors, n) {
  const rand = rng(1607)
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand())
  const f = allocate(n)
  for (let i = 0; i < n; i++) {
    const p = points[Math.floor(rand() * points.length)]
    const sigma = 0.035 + rand() ** 2 * 0.2
    f.position.set([p.x + gauss() * sigma, p.y + gauss() * sigma, p.z + gauss() * sigma], i * 3)
    const c = hexToRgb(clusterColors[p.cluster])
    const w = rand() * 0.35 // a little toward white
    f.color.set(c.map((v) => v + (1 - v) * w), i * 3)
    f.size[i] = 0.018 + rand() ** 3 * 0.05
    f.alpha[i] = 0.25 + rand() * 0.5
    f.seed[i] = rand()
    f.group[i] = PROJECTS.indexOf(p.project ?? '')
  }
  return f
}

export function makeDeep(n) {
  const rand = rng(2026)
  const f = allocate(n)
  const palette = DEEP_COLORS.map(hexToRgb)
  for (let i = 0; i < n; i++) {
    // Direction uniform on the sphere, flattened a little into a band;
    // radius from just outside the map out to the far field.
    const u = rand() * 2 - 1
    const phi = rand() * Math.PI * 2
    const k = Math.sqrt(1 - u * u)
    const r = 1.8 + rand() ** 1.6 * 16
    f.position.set([r * k * Math.cos(phi), r * u * 0.62, r * k * Math.sin(phi)], i * 3)
    f.color.set(palette[Math.floor(rand() * palette.length)], i * 3)
    f.size[i] = 0.03 + rand() ** 4 * 0.14
    f.alpha[i] = 0.18 + rand() * 0.5
    f.seed[i] = rand()
    f.group[i] = -2
  }
  return f
}
