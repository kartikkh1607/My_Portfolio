// One requestAnimationFrame loop for the whole page. Lenis, the R3F render
// and the DOM readers (map tooltip) run in that order inside the same frame,
// so the 3D background always draws at the scroll position Lenis just set.
//
// With motion allowed the loop runs every frame. With reduced motion it only
// runs when something asks for a frame (scroll, resize, a chip click).
// Either way it stops while the tab is hidden.

export const ORDER = { scroll: 0, scene: 10, dom: 20 }

const subs = []
let id = 0
let continuous = false

function frame(t) {
  id = 0
  for (const s of subs) s.fn(t)
  if (continuous) requestTick()
}

export function requestTick() {
  if (!id && !document.hidden) id = requestAnimationFrame(frame)
}

export function onTick(fn, order = ORDER.dom) {
  const sub = { fn, order }
  subs.push(sub)
  subs.sort((a, b) => a.order - b.order)
  requestTick()
  return () => {
    const i = subs.indexOf(sub)
    if (i !== -1) subs.splice(i, 1)
  }
}

export function setContinuous(on) {
  continuous = on
  if (on) requestTick()
}

export function startTicker() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(id)
      id = 0
    } else {
      requestTick()
    }
  })
}
