// The map's 2D box: PCA x right, y up, padded by 0.12. This is the same box
// as the viewBox of public/map-static.svg (built by scripts/map/build_map.py),
// so the 3D view, framed to it, lines up with the SVG when it takes over.
import data from '../../data/embedding-map.json'

const PAD = 0.12
const xs = data.points.map((p) => p.x)
const ys = data.points.map((p) => p.y)

export const BOX = {
  x0: Math.min(...xs) - PAD,
  y1: Math.max(...ys) + PAD, // top edge (y up)
  w: Math.max(...xs) - Math.min(...xs) + 2 * PAD,
  h: Math.max(...ys) - Math.min(...ys) + 2 * PAD,
}

// Center of the box in map coordinates; the 3D map rotates around it.
export const CENTER = [BOX.x0 + BOX.w / 2, BOX.y1 - BOX.h / 2, 0]

// Scale (px per map unit) and offset of the box fitted inside a frame,
// like object-fit: contain.
export function fitBox(width, height) {
  const k = Math.min(width / BOX.w, height / BOX.h)
  return { k, ox: (width - BOX.w * k) / 2, oy: (height - BOX.h * k) / 2 }
}

// Frame-relative positions of the points in the static SVG.
export function svgScreen(points, width, height, out) {
  const { k, ox, oy } = fitBox(width, height)
  points.forEach((p, i) => {
    out[2 * i] = ox + (p.x - BOX.x0) * k
    out[2 * i + 1] = oy + (BOX.y1 - p.y) * k
  })
}
