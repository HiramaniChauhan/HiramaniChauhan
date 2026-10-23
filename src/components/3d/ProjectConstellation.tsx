"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface PlanetNodeProps {
  project: Project;
  position: [number, number, number];
  size: number;
}

function PlanetNode({ project, position, size }: PlanetNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const { playHover, playChime } = useSoundEffects();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.1;
      const targetScale = hovered ? 1.25 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    playHover();
    if (typeof document !== "undefined") {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "auto";
    }
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    playChime(660, 0.35);
    setSelectedProject(project);
  };

  return (
    <group position={position}>
      {/* Planetary Orbit Ring Outline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.5, size * 1.54, 32]} />
        <meshBasicMaterial
          color={project.planetColor}
          transparent
          opacity={hovered ? 0.6 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Planet Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={project.planetColor}
          roughness={0.3}
          metalness={0.7}
          emissive={project.planetColor}
          emissiveIntensity={hovered ? 0.8 : 0.35}
        />
      </mesh>

      {/* Atmosphere Glow Mesh */}
      <mesh>
        <sphereGeometry args={[size * 1.15, 24, 24]} />
        <meshBasicMaterial
          color={project.planetColor}
          wireframe
          transparent
          opacity={hovered ? 0.5 : 0.15}
        />
      </mesh>

      {/* Tilt Ring (for specific planets) */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[size * 1.7, 0.02, 12, 48]} />
        <meshBasicMaterial
          color={project.planetColor}
          transparent
          opacity={hovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* Interactive Floating Label */}
      <Html position={[0, size + 0.6, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
        <div
          onClick={handleClick}
          className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono whitespace-nowrap transition-all duration-300 pointer-events-auto cursor-pointer flex items-center gap-2 ${
            hovered
              ? "bg-[#131418]/95 border-[#b9c7a5] text-[#b9c7a5] shadow-lg shadow-[#b9c7a5]/20 scale-105"
              : "bg-[#0c0d10]/80 border-white/10 text-slate-300"
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.planetColor }}
          />
          <span className="font-serif text-sm font-normal text-[#f2f4ec]">{project.title.split("—")[0].trim()}</span>
          <span className="text-[10px] text-[#828795]">[{project.category}]</span>
        </div>
      </Html>
    </group>
  );
}

export function ProjectConstellation() {
  const groupRef = useRef<THREE.Group>(null);

  // Position the 4 major projects around a cinematic solar focal plane
  const positions: [number, number, number][] = [
    [-3.2, 0.8, -0.5], // Top Left: Financial AI
    [3.2, 1.2, 0.2],   // Top Right: VisionGuard
    [-2.4, -1.6, 0.5], // Bottom Left: Quality Automation
    [2.8, -1.4, -0.2], // Bottom Right: Digital Learning
  ];

  const sizes = [0.65, 0.72, 0.58, 0.62];

  useFrame((state) => {
    if (groupRef.current) {
      const { x, y } = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.25,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -y * 0.15,
        0.05
      );
      // Gentle ambient floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Cosmic Pulsar Anchor */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#b9c7a5" distance={8} />

      {/* Render 4 Project Planets */}
      {PROJECTS_DATA.map((project, idx) => (
        <PlanetNode
          key={project.id}
          project={project}
          position={positions[idx]}
          size={sizes[idx]}
        />
      ))}
    </group>
  );
}
