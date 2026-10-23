// Document-relative boxes for elements the scroll/render loop reads every
// frame (the hero map frame, the [data-scene] blocks). Measuring them once and
// re-measuring only when the page's layout changes keeps the loop from forcing
// a layout on every frame. offsetTop ignores transforms, so reveal and tilt
// animations don't skew the numbers.

const boxes = new Map()
let docHeight = 0
let valid = false

function measure(el) {
  let top = 0
  let left = 0
  for (let n = el; n; n = n.offsetParent) {
    top += n.offsetTop
    left += n.offsetLeft
  }
  return { top, left, width: el.offsetWidth, height: el.offsetHeight }
}

function refresh() {
  for (const el of boxes.keys()) boxes.set(el, measure(el))
  docHeight = document.documentElement.scrollHeight
  valid = true
}

export function invalidateLayout() {
  valid = false
}

// Box of `el` in document coordinates.
export function docBox(el) {
  if (!boxes.has(el)) {
    boxes.set(el, null)
    valid = false
  }
  if (!valid) refresh()
  return boxes.get(el)
}

export function scrollMax() {
  if (!valid) refresh()
  return Math.max(docHeight - window.innerHeight, 1)
}

export function startLayoutWatch() {
  const ro = new ResizeObserver(invalidateLayout)
  ro.observe(document.body)
  window.addEventListener('resize', invalidateLayout)
  document.fonts?.ready.then(invalidateLayout)
}
