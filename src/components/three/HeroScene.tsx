import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Float,
  Text3D,
  Center,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import FloatingLens from './FloatingLens'

function ChromeText() {
  return (
    <Center>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text3D
          font="/fonts/space-grotesk-bold.json"
          size={1.2}
          height={0.4}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={5}
          curveSegments={32}
        >
          LENZ
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={1}
            roughness={0.08}
            envMapIntensity={1.5}
          />
        </Text3D>
      </Float>
    </Center>
  )
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!)
  const { pointer } = useThree()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.15,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.1,
        0.05
      )
    }
  })

  return <group ref={groupRef}>{children}</group>
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        castShadow={false}
      />
      <spotLight
        position={[-5, 3, -5]}
        angle={0.4}
        penumbra={1}
        intensity={0.3}
      />

      <Environment preset="city" />

      <MouseParallax>
        <ChromeText />
        <FloatingLens />
      </MouseParallax>

      <ParticleField />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          intensity={0.5}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={true}
          modulationOffset={0.5}
        />
      </EffectComposer>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  )
}
