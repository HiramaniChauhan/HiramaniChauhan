"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CosmicBackgroundProps {
  count?: number;
  speed?: number;
}

// Pure deterministic pseudo-random generator
function prng(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function CosmicBackground({ count = 2200, speed = 0.05 }: CosmicBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Generate deep cosmic starfield with pure deterministic values
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyanColor = new THREE.Color("#42E8FF");
    const purpleColor = new THREE.Color("#A77BFF");
    const goldColor = new THREE.Color("#FFB86B");
    const whiteColor = new THREE.Color("#F8FAFC");

    for (let i = 0; i < count; i++) {
      const rand1 = prng(i * 3 + 1);
      const rand2 = prng(i * 3 + 2);
      const rand3 = prng(i * 3 + 3);
      const randColor = prng(i * 5 + 7);

      // Spherical distribution
      const r = 15 + rand1 * 45;
      const theta = 2 * Math.PI * rand2;
      const phi = Math.acos(2 * rand3 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color variation
      let starColor = whiteColor;
      if (randColor < 0.25) starColor = cyanColor;
      else if (randColor < 0.45) starColor = purpleColor;
      else if (randColor < 0.55) starColor = goldColor;

      col[i * 3] = starColor.r;
      col[i * 3 + 1] = starColor.g;
      col[i * 3 + 2] = starColor.b;
    }

    return [pos, col];
  }, [count]);

  // Generate closer cosmic dust particles
  const dustPositions = useMemo(() => {
    const dCount = 200;
    const pos = new Float32Array(dCount * 3);
    for (let i = 0; i < dCount; i++) {
      pos[i * 3] = (prng(i * 7 + 11) - 0.5) * 20;
      pos[i * 3 + 1] = (prng(i * 7 + 13) - 0.5) * 20;
      pos[i * 3 + 2] = (prng(i * 7 + 17) - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * speed * 0.2;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
    }
    if (dustRef.current) {
      dustRef.current.rotation.y -= delta * speed * 0.4;
      dustRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <group>
      {/* Deep Stars */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Foreground Cosmic Dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          color="#42E8FF"
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
