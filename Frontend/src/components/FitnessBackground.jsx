import React, { Suspense, useRef, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PerspectiveCamera, Torus, Sphere, BakeShadows } from '@react-three/drei';
import * as THREE from 'three';

const Kettlebell = () => {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.05);
    group.current.rotation.z = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group>
          <Sphere args={[2, 32, 32]}>
            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.7} />
          </Sphere>
          <group position={[0, 1.8, 0]}>
             <Torus args={[0.8, 0.15, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
             </Torus>
          </group>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[2.02, 0.05, 16, 100]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

const FitnessBackground = memo(() => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 bg-[#fdfcf6]">
      <Canvas shadows dpr={[1, 1.5]}>
         <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
         <ambientLight intensity={0.8} />
         <pointLight position={[10, 10, 10]} intensity={1.5} color="#ef4444" />
         <Suspense fallback={null}>
            <Kettlebell />
            <Environment preset="studio" />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4.5} />
            <BakeShadows />
         </Suspense>
      </Canvas>
    </div>
  );
});

export default FitnessBackground;
