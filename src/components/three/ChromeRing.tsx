import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Float,
  AdaptiveDpr,
  AdaptiveEvents,
  ContactShadows,
} from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

function Ring() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Slow, elegant auto-rotation
      meshRef.current.rotation.x += delta * 0.08
      meshRef.current.rotation.z += delta * 0.04

      // Subtle mouse parallax
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.25,
        0.02
      )
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -pointer.y * 0.15 + 0.6,
        0.02
      )
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.15}>
      <mesh ref={meshRef} position={[0, 0.2, 0]}>
        {/* Smaller, more refined torus — like the Halo reference */}
        <torusGeometry args={[1.1, 0.42, 256, 512]} />
        <meshPhysicalMaterial
          color="#e8e8e8"
          metalness={1}
          roughness={0.02}
          envMapIntensity={2.8}
          clearcoat={1}
          clearcoatRoughness={0.03}
          reflectivity={1}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />

      {/* Key light — strong, directional */}
      <directionalLight position={[5, 8, 5]} intensity={1.2} />

      {/* Fill light — soft, opposite side */}
      <directionalLight position={[-4, 3, -3]} intensity={0.3} />

      {/* Rim light — edge highlight */}
      <spotLight
        position={[0, 5, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.6}
      />

      <Environment preset="studio" />

      <Ring />

      {/* Subtle floor shadow */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.15}
        scale={8}
        blur={2.5}
        far={4}
      />

      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.06}
          bokehScale={3}
        />
        <Bloom
          luminanceThreshold={0.85}
          luminanceSmoothing={0.9}
          intensity={0.2}
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
      dpr={[1.5, 2.5]}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  )
}
