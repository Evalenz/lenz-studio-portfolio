import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'

function ChromeSphere({ size = 0.6 }: { size?: number }) {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color="#d4d4d4"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function ChromePill({ width = 1.2, height = 0.4 }: { width?: number; height?: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh rotation={[0, 0, Math.PI * 0.1]}>
        <capsuleGeometry args={[height, width, 16, 32]} />
        <MeshDistortMaterial
          color="#d4d4d4"
          metalness={1}
          roughness={0.03}
          envMapIntensity={2.5}
          distort={0.08}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

function ChromeTorus({ radius = 0.5, tube = 0.15 }: { radius?: number; tube?: number }) {
  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh rotation={[Math.PI * 0.3, 0, 0]}>
        <torusGeometry args={[radius, tube, 32, 64]} />
        <MeshDistortMaterial
          color="#d4d4d4"
          metalness={1}
          roughness={0.04}
          envMapIntensity={2}
          distort={0.06}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

interface ChromeDecorProps {
  shape: 'sphere' | 'pill' | 'torus'
  className?: string
}

export default function ChromeDecor({ shape, className = '' }: ChromeDecorProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 3], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          frameloop="demand"
        >
          <ambientLight intensity={0.4} />
          <spotLight position={[3, 3, 3]} intensity={0.6} />
          <Environment preset="studio" />
          {shape === 'sphere' && <ChromeSphere />}
          {shape === 'pill' && <ChromePill />}
          {shape === 'torus' && <ChromeTorus />}
        </Canvas>
      </Suspense>
    </div>
  )
}
