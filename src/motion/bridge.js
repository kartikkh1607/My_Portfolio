// Shared, mutable state between the page and the lazily loaded 3D scene.
// React handlers write it; the scene reads it every frame. Neither side
// re-renders the other.
import data from '../data/embedding-map.json'

export const scene = {
  reduced: false,
  finePointer: false,
  compact: false, // phone-sized: fewer points, lower DPR
  frame: null, // the hero map frame; the 3D map is drawn to fit inside it
  tooltip: null, // tooltip element, positioned by the scene while live
  focus: 'top', // data-scene id of the block crossing the middle of the viewport
  chip: null, // active "Ask the map" chip: { q, top }
  hover: null, // point index whose sentence the tooltip shows
  dragX: 0, // drag distance not yet applied to the map rotation, px
  dragY: 0,
  dragging: false,
  pointerX: 0, // mouse position, -1..1, for parallax
  pointerY: 0,
  // Frame-relative screen position of every map point (x, y pairs),
  // used for hover hit-testing. Written by the scene, or from the static
  // SVG layout before it loads.
  screen: new Float32Array(data.points.length * 2),
  status: 'static', // 'static' (SVG) | 'live' (3D on screen)
}

const listeners = new Set()

export function setStatus(status) {
  scene.status = status
  listeners.forEach((fn) => fn())
}

export function subscribeStatus(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
