// 3D embedding map (CLAUDE.md §6). Lazy-loaded by MapSection, so three.js,
// @react-three/fiber and drei live in their own chunk.
//
// Each point is a sentence from scripts/map/sentences.yaml, embedded with
// all-MiniLM-L6-v2 and projected to 3D with PCA at build time. Nothing is
// computed from text at runtime.
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MapTooltip, { clampX } from '../components/map/MapTooltip.jsx'

const SETTLE_S = 1.2 // the one orchestrated animation: scattered -> clusters
const SPIN = 0.02 // ambient rotation, rad/s
const RADIUS = 0.035
const FOV = 42
const BASE_DISTANCE = 2.6

function readColors(clusters) {
  const css = getComputedStyle(document.documentElement)
  return Object.fromEntries(clusters.map((c) => [c, css.getPropertyValue(`--map-${c}`).trim()]))
}

// Cluster colors come from the CSS tokens, so the map follows the theme toggle.
function useClusterColors(points) {
  const clusters = useMemo(() => [...new Set(points.map((p) => p.cluster))], [points])
  const [colors, setColors] = useState(() => readColors(clusters))

  useEffect(() => {
    const update = () => setColors(readColors(clusters))
    const mo = new MutationObserver(update)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', update)
    return () => {
      mo.disconnect()
      mq.removeEventListener('change', update)
    }
  }, [clusters])

  return colors
}

// Deterministic start positions inside a sphere around the clusters.
function scatter(n) {
  let s = 1607
  const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
  return Array.from({ length: n }, () => {
    const u = rand() * 2 - 1
    const phi = rand() * Math.PI * 2
    const r = 1.6 + rand() * 0.8
    const k = Math.sqrt(1 - u * u)
    return [r * k * Math.cos(phi), r * u, r * k * Math.sin(phi)]
  })
}

// The field of view is vertical, so a tall (portrait) frame shows less width.
// Back the camera off until the cube fits horizontally too.
function FitCamera() {
  const { camera, size } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    const halfTan = Math.tan(((FOV / 2) * Math.PI) / 180)
    const distance = Math.max(BASE_DISTANCE, 1.08 / (halfTan * aspect))
    camera.position.setLength(distance)
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function Points({ points, colors, highlight, tooltipIdx, onHover, tipRef }) {
  const group = useRef(null)
  const meshes = useRef([])
  const born = useRef(null)
  const start = useMemo(() => scatter(points.length), [points])
  const geometry = useMemo(() => new THREE.SphereGeometry(RADIUS, 16, 12), [])
  const world = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1)
    if (born.current === null) born.current = state.clock.elapsedTime
    const t = Math.min((state.clock.elapsedTime - born.current) / SETTLE_S, 1)
    const e = 1 - (1 - t) ** 3

    group.current.rotation.y += dt * SPIN

    meshes.current.forEach((m, i) => {
      if (!m) return
      const s = start[i]
      const p = points[i]
      m.position.set(s[0] + (p.x - s[0]) * e, s[1] + (p.y - s[1]) * e, s[2] + (p.z - s[2]) * e)
      const lit = !highlight || highlight.has(i)
      const scale = (highlight && lit ? 1.7 : 1) * (tooltipIdx === i ? 1.35 : 1)
      m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, scale, 14, dt))
      m.material.opacity = THREE.MathUtils.damp(m.material.opacity, lit ? 1 : 0.25, 14, dt)
    })

    // Move the HTML tooltip to the projected screen position of its point.
    const tip = tipRef.current
    if (!tip) return
    const m = tooltipIdx == null ? null : meshes.current[tooltipIdx]
    if (!m) {
      tip.style.visibility = 'hidden'
      return
    }
    m.getWorldPosition(world).project(state.camera)
    const { width, height } = state.size
    tip.style.left = `${clampX(((world.x + 1) / 2) * width, width)}px`
    tip.style.top = `${((1 - world.y) / 2) * height - 6}px`
    tip.style.visibility = 'visible'
  })

  return (
    <group ref={group} rotation={[0.25, 0, 0]}>
      {points.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => (meshes.current[i] = el)}
          geometry={geometry}
          position={start[i]}
          onPointerOver={(ev) => {
            ev.stopPropagation()
            onHover(i)
          }}
          onPointerOut={() => onHover(null)}
          onClick={(ev) => {
            ev.stopPropagation()
            onHover(i)
          }}
        >
          <meshBasicMaterial color={colors[p.cluster]} transparent opacity={1} />
        </mesh>
      ))}
    </group>
  )
}

export default function EmbeddingMap({ points, highlight, tooltipIdx, onHover, running }) {
  const colors = useClusterColors(points)
  const tipRef = useRef(null)
  // Drag-to-orbit only with a mouse/trackpad: on touch it would block page scroll.
  const [finePointer] = useState(() => window.matchMedia('(pointer: fine)').matches)

  return (
    <div className="relative h-full w-full">
      <Canvas
        aria-hidden="true"
        dpr={[1, 1.5]}
        frameloop={running ? 'always' : 'never'}
        camera={{ position: [0, 0, BASE_DISTANCE], fov: FOV }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        onPointerMissed={() => onHover(null)}
        style={{ cursor: finePointer ? 'grab' : 'default' }}
      >
        <FitCamera />
        <Points
          points={points}
          colors={colors}
          highlight={highlight}
          tooltipIdx={tooltipIdx}
          onHover={onHover}
          tipRef={tipRef}
        />
        {/* Rotate only: zoom would hijack page scroll. */}
        {finePointer && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} enableDamping />}
      </Canvas>
      <MapTooltip ref={tipRef} style={{ visibility: 'hidden', left: 0, top: 0 }}>
        {tooltipIdx != null ? points[tooltipIdx].text : ''}
      </MapTooltip>
    </div>
  )
}
