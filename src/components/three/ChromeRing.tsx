import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Float,
  AdaptiveDpr,
  AdaptiveEvents,
  MeshDistortMaterial,
} from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

function Ring() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Slow auto-rotation
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.z += delta * 0.08

      // Mouse influence — subtle tilt
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.4,
        0.03
      )
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -pointer.y * 0.3 + 0.5,
        0.03
      )
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.7, 128, 256]} />
        <MeshDistortMaterial
          color="#d4d4d4"
          metalness={1}
          roughness={0.03}
          envMapIntensity={2.5}
          distort={0.05}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[8, 8, 5]} angle={0.3} penumbra={1} intensity={1} />
      <spotLight position={[-5, 5, -5]} angle={0.4} penumbra={1} intensity={0.4} />

      <Environment preset="studio" />

      <Ring />

      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.05}
          bokehScale={4}
        />
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          intensity={0.3}
          mipmapBlur
        />
      </EffectComposer>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}

export default function ChromeRing() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  )
}
