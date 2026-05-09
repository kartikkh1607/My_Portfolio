import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 2800 }) {
  const ref = useRef()
  const clock = useRef(0)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18  // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18  // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12  // z
    }
    return arr
  }, [count])

  const sizes = useMemo(() => {
    const arr = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 0.6 + 0.2
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    clock.current += delta

    if (ref.current) {
      // Slow gentle rotation
      ref.current.rotation.x = clock.current * 0.02
      ref.current.rotation.y = clock.current * 0.03

      // Mouse parallax
      const { x, y } = state.mouse
      ref.current.rotation.x += y * 0.002
      ref.current.rotation.y += x * 0.002
    }
  })

  return (
    <Points
      ref={ref}
      positions={positions}
      sizes={sizes}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.045}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function ConnectionLines({ count = 60 }) {
  const ref = useRef()

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8
        )
      )
    }
    return pts
  }, [count])

  const linePositions = useMemo(() => {
    const arr = []
    const threshold = 3.5
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < threshold) {
          arr.push(points[i].x, points[i].y, points[i].z)
          arr.push(points[j].x, points[j].y, points[j].z)
        }
      }
    }
    return new Float32Array(arr)
  }, [points])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025
      ref.current.rotation.x += delta * 0.015
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
        opacity={0.1}
        linewidth={1}
      />
    </lineSegments>
  )
}

export default function ParticlesCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 70 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <Particles />
        <ConnectionLines />
      </Canvas>
    </div>
  )
}