"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic PRNG for floating dust particles
function prng(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function Hero3DCore() {
  const sceneRef = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Pillar positions receding into perspective depth
  const pillars = useMemo(() => {
    const list: { pos: [number, number, number]; scale: [number, number, number] }[] = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const z = -i * 2.2 + 2;
      const xOffset = 2.6 + i * 0.45;
      const height = 4.5 + i * 0.3;

      // Left pillar
      list.push({
        pos: [-xOffset, 0, z],
        scale: [0.35, height, 0.6],
      });
      // Right pillar
      list.push({
        pos: [xOffset, 0, z],
        scale: [0.35, height, 0.6],
      });
    }
    return list;
  }, []);

  // Floating dust motes within the light shaft
  const dustData = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (prng(i * 3 + 1) - 0.5) * 6;
      pos[i * 3 + 1] = prng(i * 3 + 2) * 5 - 1;
      pos[i * 3 + 2] = (prng(i * 3 + 3) - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    // Subtle, smooth camera parallax
    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        x * 0.12,
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        -y * 0.08,
        0.05
      );
    }

    // Slow drifting dust particles in light
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.02;
      dustRef.current.position.y = Math.sin(t * 0.4) * 0.1;
    }
  });

  return (
    <group ref={sceneRef} position={[0, 0, -2]}>
      {/* Ambient Lighting in balanced architectural charcoal */}
      <ambientLight intensity={0.16} color="#181a22" />

      {/* Gentle warm horizon depth light */}
      <pointLight
        position={[0, 2.5, -12]}
        intensity={0.85}
        color="#ffd480"
        distance={22}
        decay={2.0}
      />
      {/* Soft ground perspective fill */}
      <pointLight
        position={[0, -1.8, -2]}
        intensity={0.35}
        color="#dfd6c3"
        distance={15}
      />

      {/* Receding Architectural Pillars in refined charcoal */}
      {pillars.map((p, idx) => (
        <mesh key={idx} position={p.pos}>
          <boxGeometry args={p.scale} />
          <meshStandardMaterial
            color="#13151b"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Perspective Reflective Ground Floor */}
      <mesh position={[0, -2.2, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0b0c10"
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>

      {/* Gentle, soft floor perspective reflection */}
      <mesh position={[0, -2.18, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 16]} />
        <meshBasicMaterial
          color="#d5caa8"
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ambient dust motes catching soft light */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#ffe29d"
          transparent
          opacity={0.32}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
