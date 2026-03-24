import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingLens() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      groupRef.current.position.x = Math.cos(t * 0.3) * 3.5
      groupRef.current.position.z = Math.sin(t * 0.3) * 3.5
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.5
      groupRef.current.rotation.x = t * 0.2
      groupRef.current.rotation.z = t * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh>
          <torusGeometry args={[0.4, 0.15, 32, 64]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
    </group>
  )
}
