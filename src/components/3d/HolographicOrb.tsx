"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HolographicOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      const s = 1 + Math.sin(t * 2) * 0.03;
      meshRef.current.scale.set(s, s, s);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.25;
      wireRef.current.rotation.x += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 3, 2]} intensity={2} color="#b9c7a5" />
      <pointLight position={[-2, -2, 1]} intensity={1.5} color="#c2b9d0" />

      {/* Core holographic orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#131418"
          emissive="#b9c7a5"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Geodesic wireframe cage */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#c2b9d0" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Orbiting halo ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.9, 0.015, 16, 64]} />
        <meshBasicMaterial color="#dfcaa5" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
