import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 2200 }) {
  const ref        = useRef()
  const clockRef   = useRef(0)
  const mouseRef   = useRef({ x: 0, y: 0 })
  const targetRef  = useRef({ x: 0, y: 0 })

  const { positions, originalPositions } = useMemo(() => {
    const positions         = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Spread particles in a hemisphere-ish distribution
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 6 + Math.random() * 6

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = (Math.random() - 0.5) * 16
      const z = r * Math.sin(phi) * Math.sin(theta) - 4

      positions[i * 3]     = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3]     = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
    }
    return { positions, originalPositions }
  }, [count])

  // Mouse tracking
  useMemo(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state, delta) => {
    clockRef.current += delta

    // Smooth mouse follow
    targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.03
    targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.03

    if (ref.current) {
      // Very slow drift rotation
      ref.current.rotation.y = clockRef.current * 0.018 + targetRef.current.x * 0.15
      ref.current.rotation.x = clockRef.current * 0.008 - targetRef.current.y * 0.1

      // Breathing — subtle scale pulse
      const breathe = 1 + Math.sin(clockRef.current * 0.5) * 0.015
      ref.current.scale.setScalar(breathe)
    }
  })

  return (
    <Points
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#2dd4bf"
        size={0.038}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function ConnectionLines({ count = 55 }) {
  const ref = useRef()
  const clockRef = useRef(0)

  const linePositions = useMemo(() => {
    const points = []
    for (let i = 0; i < count; i++) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
        )
      )
    }

    const arr       = []
    const threshold = 3.8
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < threshold) {
          arr.push(points[i].x, points[i].y, points[i].z)
          arr.push(points[j].x, points[j].y, points[j].z)
        }
      }
    }
    return new Float32Array(arr)
  }, [count])

  useFrame((_, delta) => {
    clockRef.current += delta
    if (ref.current) {
      ref.current.rotation.y = clockRef.current * 0.012
      ref.current.rotation.x = clockRef.current * 0.007
    }
  })

  if (linePositions.length === 0) return null

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={linePositions}
          count={linePositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#2dd4bf"
        transparent
        opacity={0.06}
      />
    </lineSegments>
  )
}

// Soft ambient glow sphere in the center
function GlowSphere() {
  const ref = useRef()
  const clockRef = useRef(0)

  useFrame((_, delta) => {
    clockRef.current += delta
    if (ref.current) {
      ref.current.material.opacity =
        0.03 + Math.sin(clockRef.current * 0.6) * 0.015
    }
  })

  return (
    <mesh ref={ref} position={[2, 0, -3]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial
        color="#2dd4bf"
        transparent
        opacity={0.03}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

export default function ParticlesCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 65 }}
        gl={{
          antialias:   false,
          alpha:       true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Particles />
        <ConnectionLines />
        <GlowSphere />
      </Canvas>
    </div>
  )
}