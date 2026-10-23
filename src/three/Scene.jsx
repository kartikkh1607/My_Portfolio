// Full-page 3D background: the embedding map as a "latent space".
// Lazy-loaded by Background.jsx after first paint, so three.js and R3F live
// in their own chunk.
//
// The 98 real points come from scripts/map/build_map.py (all-MiniLM-L6-v2,
// PCA to 3D). The thousands of points around them are decoration (field.js).
//
// Camera: while the hero map frame is on screen the map is drawn exactly
// inside it (distance and lens shift computed from the frame's rect, so it
// matches public/map-static.svg). Scrolling away blends into a flight pose
// per section: the camera dives to each project's cluster, which brightens,
// and query beams run from the project's query to its 8 nearest sentences.
//
// The canvas never runs its own loop (frameloop="never"); the shared ticker
// calls advance() right after Lenis has updated the scroll position.
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import data from '../data/embedding-map.json'
import { scene as S, setStatus } from '../motion/bridge.js'
import { docBox, scrollMax } from '../motion/layout.js'
import { ORDER, onTick, requestTick } from '../motion/ticker.js'
import { CENTER, fitBox } from '../components/map/layout.js'
import { clampX } from '../components/map/MapTooltip.jsx'
import { PROJECTS, makeDeep, makeHaze } from './field.js'
import * as glsl from './shaders.js'

const { points, projects } = data
const FOV = 40
const TAN = Math.tan(((FOV / 2) * Math.PI) / 180)
const SPIN = 0.05 // auto-rotation, rad/s
const MAP_SIZE = 0.215 // sprite size whose solid core matches the SVG dot (r = 0.032)
const K = 8 // neighbours per query

// Where the camera goes while each block is in the middle of the viewport.
// az/el: orbit angles around the target; lens: where the target sits on
// screen (NDC), so on desktop a cluster shows beside its card, not under it.
// dim: brightness of the whole scene; text-only blocks (no glass panel) get
// less, and on phones, where nothing can sit beside the text, less again.
const POSES = {
  top: { dist: 3.6, az: 0, el: 0.08, lens: [0.35, 0], dim: 1 },
  'yt-lecture-rag': { dist: 2.4, az: -0.6, el: 0.22, lens: [0, 0], dim: 0.9 },
  hiremeai: { dist: 2.2, az: 0.55, el: -0.12, lens: [0.55, 0], dim: 0.9 },
  mealtime: { dist: 2.2, az: 1.3, el: 0.18, lens: [-0.55, 0], dim: 0.9 },
  'dsa-tracker': { dist: 2.2, az: 2.0, el: 0.05, lens: [0.55, 0], dim: 0.9 },
  skills: { dist: 5, az: 2.8, el: 0.42, lens: [0, -0.1], dim: 0.6, text: true },
  'earlier-work': { dist: 3.4, az: 3.5, el: -0.15, lens: [0.45, 0.25], dim: 0.65, text: true },
  achievements: { dist: 7, az: 4.3, el: -0.3, lens: [0, 0], dim: 0.6, text: true },
  contact: { dist: 4.8, az: 5.9, el: 0.12, lens: [0.45, 0.3], dim: 0.7, text: true },
}

const ADDITIVE = {
  transparent: true,
  depthTest: false,
  depthWrite: false,
  blending: THREE.CustomBlending,
  blendSrc: THREE.OneFactor,
  blendDst: THREE.OneFactor,
  blendSrcAlpha: THREE.OneFactor,
  blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
}

const rgb = (hex) => {
  const n = parseInt(hex.trim().slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function clusterColors() {
  const css = getComputedStyle(document.documentElement)
  const names = [...new Set(points.map((p) => p.cluster))]
  return Object.fromEntries(names.map((c) => [c, css.getPropertyValue(`--map-${c}`).trim() || '#ffffff']))
}

function centroid(id) {
  const ps = points.filter((p) => p.project === id)
  const c = new THREE.Vector3()
  ps.forEach((p) => c.add(new THREE.Vector3(p.x, p.y, p.z)))
  return c.divideScalar(ps.length || 1)
}

function geometryFrom(f) {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(f.position, 3))
  g.setAttribute('aColor', new THREE.BufferAttribute(f.color, 3))
  g.setAttribute('aSize', new THREE.BufferAttribute(f.size, 1))
  g.setAttribute('aAlpha', new THREE.BufferAttribute(f.alpha, 1))
  g.setAttribute('aSeed', new THREE.BufferAttribute(f.seed, 1))
  g.setAttribute('aGroup', new THREE.BufferAttribute(f.group, 1))
  return g
}

function fieldMaterial(drift) {
  return new THREE.ShaderMaterial({
    ...ADDITIVE,
    vertexShader: glsl.fieldVert,
    fragmentShader: glsl.fieldFrag,
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: 1 },
      uFade: { value: 0 },
      uDim: { value: 1 },
      uDrift: { value: drift },
      uMaxPx: { value: 32 },
      uGlow: { value: new THREE.Vector4() },
    },
  })
}

function useWorld() {
  return useMemo(() => {
    const colors = clusterColors()
    const compact = S.compact
    const haze = makeHaze(points, colors, compact ? 650 : 1900)
    const deep = makeDeep(compact ? 850 : 3100)

    const mapGeo = new THREE.BufferGeometry()
    mapGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3))
    mapGeo.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(points.flatMap((p) => rgb(colors[p.cluster]))), 3))
    mapGeo.setAttribute('aLit', new THREE.BufferAttribute(new Float32Array(points.length).fill(1), 1))
    const mapMat = new THREE.ShaderMaterial({
      ...ADDITIVE,
      vertexShader: glsl.mapVert,
      fragmentShader: glsl.mapFrag,
      uniforms: { uScale: { value: 1 }, uSize: { value: MAP_SIZE }, uFade: { value: 0 }, uMaxPx: { value: 64 } },
    })

    // K line segments, query -> neighbour
    const beamGeo = new THREE.BufferGeometry()
    beamGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(K * 6), 3))
    beamGeo.setAttribute('aT', new THREE.BufferAttribute(new Float32Array(K * 2).map((_, i) => i % 2), 1))
    beamGeo.setAttribute('aK', new THREE.BufferAttribute(new Float32Array(K * 2).map((_, i) => i >> 1), 1))
    const beamMat = new THREE.ShaderMaterial({
      ...ADDITIVE,
      vertexShader: glsl.beamVert,
      fragmentShader: glsl.beamFrag,
      uniforms: {
        uProg: { value: 0 },
        uAlpha: { value: 0 },
        uPulse: { value: 1 },
        uFrom: { value: new THREE.Vector3(...rgb('#67E8F9')) },
        uTo: { value: new THREE.Vector3(...rgb('#C4B5FD')) },
      },
    })

    // K beam heads + 1 query marker
    const sparkGeo = new THREE.BufferGeometry()
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array((K + 1) * 3), 3))
    sparkGeo.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(K + 1).fill(0.11), 1))
    sparkGeo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(K + 1), 1))
    sparkGeo.setAttribute('aRing', new THREE.BufferAttribute(new Float32Array(K + 1).map((_, i) => (i === K ? 1 : 0)), 1))
    const sparkMat = new THREE.ShaderMaterial({
      ...ADDITIVE,
      vertexShader: glsl.sparkVert,
      fragmentShader: glsl.sparkFrag,
      uniforms: { uScale: { value: 1 }, uMaxPx: { value: 64 }, uColor: { value: new THREE.Vector3(...rgb('#67E8F9')) } },
    })

    const targets = Object.fromEntries([...PROJECTS, 'earlier-work'].map((id) => [id, centroid(id)]))

    return {
      haze: { geo: geometryFrom(haze), mat: fieldMaterial(0.025), maxPx: 14 },
      deep: { geo: geometryFrom(deep), mat: fieldMaterial(0.22), maxPx: 30 },
      map: { geo: mapGeo, mat: mapMat },
      beam: { geo: beamGeo, mat: beamMat },
      spark: { geo: sparkGeo, mat: sparkMat },
      targets,
    }
  }, [])
}

const smooth = (t) => t * t * (3 - 2 * t)
const clamp01 = (t) => Math.min(Math.max(t, 0), 1)
const ease = (lambda, dt) => 1 - Math.exp(-lambda * dt)

function World() {
  const w = useWorld()
  const root = useRef(null)
  const inner = useRef(null)
  const deepRef = useRef(null)
  const { camera } = useThree()

  // Per-frame state that never needs React.
  const st = useMemo(
    () => ({
      time: 0,
      frames: 0,
      liveAt: null,
      yaw: 0,
      pitch: 0,
      yawVel: 0,
      flightPos: new THREE.Vector3(0, 0, 4),
      flightTarget: new THREE.Vector3(),
      flightLens: new THREE.Vector2(),
      parallax: new THREE.Vector2(),
      glow: new THREE.Vector4(),
      dim: 1,
      beamKey: null,
      beamFrom: new THREE.Vector3(),
      beamTop: [],
      beamFire: 0,
      beamAlpha: 0,
      lastPhase: new Float32Array(K),
      flash: new Float32Array(points.length),
      initialized: false,
      tmp: new THREE.Vector3(),
      tmp2: new THREE.Vector3(),
    }),
    [],
  )

  useEffect(
    () => () => {
      Object.values(w).forEach((o) => {
        o.geo?.dispose()
        o.mat?.dispose()
      })
    },
    [w],
  )

  useFrame((state, delta) => {
    const reduced = S.reduced
    const dt = Math.min(Math.max(delta, 0), 0.05)
    if (!reduced) st.time += dt
    const { width: W, height: H } = state.size
    const dpr = state.viewport.dpr

    // ── Fade in, then hand over from the SVG ──────────────────────
    st.frames++
    if (st.frames === 2) {
      st.liveAt = st.time
      setStatus('live')
    }
    if (st.frames < 3) requestTick() // reduced motion renders on demand
    const since = st.liveAt == null ? 0 : st.time - st.liveAt
    const fade = reduced ? (st.liveAt == null ? 0 : 1) : smooth(clamp01(since / 0.9))

    // ── Map rotation: drag, inertia, slow auto-spin ───────────────
    if (S.dragX || S.dragY) {
      const dyaw = S.dragX * 0.006
      st.yaw += dyaw
      st.pitch = Math.min(Math.max(st.pitch + S.dragY * 0.004, -0.8), 0.8)
      if (dt > 0) st.yawVel = THREE.MathUtils.lerp(st.yawVel, Math.min(Math.max(dyaw / dt, -3), 3), 0.5)
      S.dragX = S.dragY = 0
    } else if (!S.dragging && !reduced) {
      const spinIn = smooth(clamp01((since - 0.8) / 2))
      st.yawVel = THREE.MathUtils.damp(st.yawVel, SPIN * spinIn, 1.8, dt)
      st.yaw += st.yawVel * dt
      st.pitch = THREE.MathUtils.damp(st.pitch, 0, 0.5, dt)
    }
    root.current.rotation.set(st.pitch, st.yaw, 0)
    root.current.updateMatrixWorld()
    if (!reduced) deepRef.current.rotation.y = st.time * 0.01

    // ── Frame-locked pose (hero) ──────────────────────────────────
    const box = S.frame && docBox(S.frame)
    const rect = box && {
      left: box.left - window.scrollX,
      top: box.top - window.scrollY,
      width: box.width,
      height: box.height,
      bottom: box.top - window.scrollY + box.height,
    }
    const frameOn = rect && rect.width > 0 && rect.bottom > 0 && rect.top < H
    let lockW = 0
    let lockDist = 3.4
    let lockLensX = 0
    let lockLensY = 0
    if (rect && rect.width > 0) {
      const { k } = fitBox(rect.width, rect.height)
      lockDist = H / (2 * k * TAN)
      lockLensX = ((rect.left + rect.width / 2) / W) * 2 - 1
      lockLensY = 1 - ((rect.top + rect.height / 2) / H) * 2
      lockW = reduced ? 1 : smooth(clamp01((rect.bottom - H * 0.3) / (H * 0.45)))
    }

    // ── Flight pose for the block in the middle of the viewport ──
    const focus = POSES[S.focus] ? S.focus : 'top'
    const pose = POSES[focus]
    const tgt = st.tmp
    if (w.targets[focus]) tgt.copy(w.targets[focus]).applyMatrix4(inner.current.matrixWorld)
    else tgt.set(0, 0, 0)
    const scrollAz = (window.scrollY / scrollMax()) * 0.9
    const az = pose.az + scrollAz
    const desired = st.tmp2
      .set(Math.sin(az) * Math.cos(pose.el), Math.sin(pose.el), Math.cos(az) * Math.cos(pose.el))
      .multiplyScalar(pose.dist * (S.compact && pose.text ? 1.6 : 1))
      .add(tgt)
    const lensX = S.compact ? 0 : pose.lens[0]
    const lensY = S.compact ? 0 : pose.lens[1]

    if (!st.initialized) {
      st.flightPos.set(0, 0, lockDist)
      st.flightLens.set(lockLensX, lockLensY)
      st.initialized = true
    }
    if (!reduced) {
      st.flightPos.lerp(desired, ease(1.6, dt))
      st.flightTarget.lerp(tgt, ease(2.2, dt))
      st.flightLens.lerp({ x: lensX, y: lensY }, ease(1.6, dt))
    }

    // Mouse parallax (desktop): nudge the camera, so near points move more.
    if (S.finePointer && !reduced) st.parallax.lerp({ x: S.pointerX, y: S.pointerY }, ease(2.5, dt))

    // ── Blend and apply ───────────────────────────────────────────
    camera.position.set(0, 0, lockDist).lerp(st.flightPos, 1 - lockW)
    const look = st.tmp2.set(0, 0, 0).lerp(st.flightTarget, 1 - lockW)
    camera.lookAt(look)
    camera.updateMatrixWorld()
    if (st.parallax.lengthSq() > 1e-6) {
      const d = camera.position.distanceTo(look)
      camera.translateX(st.parallax.x * 0.035 * d)
      camera.translateY(-st.parallax.y * 0.025 * d)
      camera.lookAt(look)
      camera.updateMatrixWorld()
    }
    camera.updateProjectionMatrix()
    const lx = THREE.MathUtils.lerp(st.flightLens.x, lockLensX, lockW)
    const ly = THREE.MathUtils.lerp(st.flightLens.y, lockLensY, lockW)
    camera.projectionMatrix.elements[8] = -lx
    camera.projectionMatrix.elements[9] = -ly
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()

    // ── Cluster glow + global intensity ───────────────────────────
    const inHero = lockW > 0.5
    const pIdx = inHero ? -1 : PROJECTS.indexOf(focus)
    const glowTarget = [0, 1, 2, 3].map((i) => (i === pIdx ? 1 : 0))
    const g = st.glow
    if (reduced) g.set(...glowTarget)
    else g.lerp({ x: glowTarget[0], y: glowTarget[1], z: glowTarget[2], w: glowTarget[3] }, ease(3, dt))
    const dimTarget = inHero ? 1 : pose.dim * (S.compact && pose.text ? 0.6 : 1)
    st.dim = reduced ? dimTarget : THREE.MathUtils.damp(st.dim, dimTarget, 2, dt)

    const scale = (H * dpr) / (2 * TAN)
    for (const f of [w.haze, w.deep]) {
      const u = f.mat.uniforms
      u.uTime.value = st.time
      u.uScale.value = scale
      u.uFade.value = fade
      u.uDim.value = st.dim
      u.uGlow.value.copy(g)
      u.uMaxPx.value = f.maxPx * dpr
    }
    // Map points never grow past their hero size (the SVG dot), in CSS px.
    const heroPx = MAP_SIZE * (H / (2 * TAN)) / Math.max(lockDist, 2.5)
    w.map.mat.uniforms.uScale.value = scale
    w.map.mat.uniforms.uFade.value = fade * st.dim
    w.map.mat.uniforms.uMaxPx.value = Math.min(heroPx, 72) * 1.15 * dpr
    w.spark.mat.uniforms.uScale.value = scale
    w.spark.mat.uniforms.uMaxPx.value = 48 * dpr

    // ── Query beams ───────────────────────────────────────────────
    let query = null
    let key = null
    if (inHero && S.chip) {
      query = S.chip
      key = `chip:${S.chip.label}`
    } else if (pIdx >= 0) {
      query = projects.find((p) => p.id === focus)
      key = `project:${focus}`
    }
    if (key !== st.beamKey && query) {
      st.beamFrom.fromArray(query.q)
      st.beamTop = query.top.slice(0, K)
      const pos = w.beam.geo.attributes.position
      st.beamTop.forEach((i, k) => {
        const p = points[i]
        pos.setXYZ(2 * k, ...query.q)
        pos.setXYZ(2 * k + 1, p.x, p.y, p.z)
      })
      pos.needsUpdate = true
      st.beamFire = st.time
      st.lastPhase.fill(0)
    }
    st.beamKey = key
    st.beamAlpha = reduced ? (query ? 1 : 0) : THREE.MathUtils.damp(st.beamAlpha, query ? 1 : 0, query ? 4 : 6, dt)
    const prog = reduced ? 10 : st.time - st.beamFire
    const bu = w.beam.mat.uniforms
    bu.uProg.value = prog
    bu.uAlpha.value = st.beamAlpha * fade
    bu.uPulse.value = reduced ? 0 : 1

    const sPos = w.spark.geo.attributes.position
    const sAlpha = w.spark.geo.attributes.aAlpha
    const sSize = w.spark.geo.attributes.aSize
    st.beamTop.forEach((i, k) => {
      const p = points[i]
      const start = k * 0.08
      const grow = clamp01((prog - start) / 0.5)
      const t = prog - start - 0.5
      let at = grow
      let alpha = grow < 1 ? 1 : 0
      if (t > 0 && !reduced) {
        const ph = (t % 2.2) / 1.2
        if (ph <= 1) {
          at = ph
          alpha = 1
        }
        if (st.lastPhase[k] < 1 && ph >= 1) st.flash[i] = 1 // the pulse arrives: flash the neighbour
        st.lastPhase[k] = ph
      }
      if (reduced) alpha = 0
      const q = st.beamFrom
      sPos.setXYZ(k, q.x + (p.x - q.x) * at, q.y + (p.y - q.y) * at, q.z + (p.z - q.z) * at)
      sAlpha.setX(k, alpha * st.beamAlpha * fade)
    })
    sPos.setXYZ(K, st.beamFrom.x, st.beamFrom.y, st.beamFrom.z)
    sAlpha.setX(K, st.beamAlpha * fade)
    sSize.setX(K, 0.15 + (reduced ? 0 : Math.sin(st.time * 3) * 0.025))
    sPos.needsUpdate = true
    sAlpha.needsUpdate = true
    sSize.needsUpdate = true

    // ── Per-point brightness ──────────────────────────────────────
    const lit = w.map.geo.attributes.aLit
    const top = query ? new Set(st.beamTop) : null
    const chipMode = query && key.startsWith('chip:')
    for (let i = 0; i < points.length; i++) {
      let target = 1
      if (chipMode) target = top.has(i) ? 1.9 : 0.35
      else if (pIdx >= 0) target = points[i].project === focus ? 1.6 : top?.has(i) ? 1.3 : 0.45
      if (S.hover === i) target += 0.8
      target += st.flash[i] * 0.9
      st.flash[i] = reduced ? 0 : Math.max(0, st.flash[i] - dt * 2.5)
      lit.setX(i, reduced ? target : THREE.MathUtils.damp(lit.getX(i), target, 9, dt))
    }
    lit.needsUpdate = true

    // ── Screen positions for hover hit-testing, and the tooltip ──
    const tip = S.tooltip
    if (frameOn) {
      inner.current.updateMatrixWorld()
      const v = st.tmp
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        v.set(p.x, p.y, p.z).applyMatrix4(inner.current.matrixWorld).project(camera)
        const visible = v.z < 1
        S.screen[2 * i] = visible ? ((v.x + 1) / 2) * W - rect.left : NaN
        S.screen[2 * i + 1] = visible ? ((1 - v.y) / 2) * H - rect.top : NaN
      }
    }
    if (tip) {
      const i = S.hover
      const x = i == null ? NaN : S.screen[2 * i]
      if (frameOn && i != null && !Number.isNaN(x)) {
        tip.style.left = `${clampX(x, rect.width)}px`
        tip.style.top = `${S.screen[2 * i + 1] - 8}px`
        tip.style.visibility = 'visible'
      } else {
        tip.style.visibility = 'hidden'
      }
    }
  })

  return (
    <>
      <points ref={deepRef} geometry={w.deep.geo} material={w.deep.mat} frustumCulled={false} />
      <group ref={root}>
        <group ref={inner} position={[-CENTER[0], -CENTER[1], -CENTER[2]]}>
          <points geometry={w.haze.geo} material={w.haze.mat} frustumCulled={false} />
          <lineSegments geometry={w.beam.geo} material={w.beam.mat} frustumCulled={false} />
          <points geometry={w.map.geo} material={w.map.mat} frustumCulled={false} />
          <points geometry={w.spark.geo} material={w.spark.mat} frustumCulled={false} />
        </group>
      </group>
    </>
  )
}

// Compile the shaders without blocking (KHR_parallel_shader_compile), then
// hand the canvas to the shared ticker.
function Driver() {
  const { advance, gl, scene, camera } = useThree()
  useEffect(() => {
    let off = null
    let alive = true
    gl.compileAsync(scene, camera)
      .catch(() => {})
      .then(() => {
        if (alive) off = onTick((t) => advance(t / 1000), ORDER.scene)
      })
    return () => {
      alive = false
      off?.()
    }
  }, [advance, gl, scene, camera])
  return null
}

// Start-up is split across idle callbacks so no single task blocks for
// long: the canvas (WebGL context) first, then the point field.
function useIdleStep() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!('requestIdleCallback' in window)) {
      const t = setTimeout(() => setReady(true), 50)
      return () => clearTimeout(t)
    }
    const id = window.requestIdleCallback(() => setReady(true), { timeout: 1000 })
    return () => window.cancelIdleCallback(id)
  }, [])
  return ready
}

function Content() {
  const ready = useIdleStep()
  return ready ? (
    <>
      <Driver />
      <World />
    </>
  ) : null
}

export default function Scene() {
  useEffect(() => () => setStatus('static'), [])
  return (
    <Canvas
      frameloop="never"
      dpr={S.compact ? [1, 1.5] : [1, 1.75]}
      camera={{ fov: FOV, near: 0.05, far: 80, position: [0, 0, 4] }}
      gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 100 } }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        // Reading compile status back is a synchronous GPU round trip per
        // shader; skip it in production (compileAsync already waited).
        gl.debug.checkShaderErrors = import.meta.env.DEV
      }}
    >
      <Content />
    </Canvas>
  )
}
