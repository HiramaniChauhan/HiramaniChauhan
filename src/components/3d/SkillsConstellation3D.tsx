"use client";

import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS_DATA, SkillItem } from "@/data/skills";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SkillNodeProps {
  skill: SkillItem;
  position: [number, number, number];
  isHighlighted: boolean;
  onSelect: (skill: SkillItem) => void;
}

function SkillNode({ skill, position, isHighlighted, onSelect }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { playHover, playClick } = useSoundEffects();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      const targetScale = hovered || isHighlighted ? 1.4 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playHover();
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          playClick();
          onSelect(skill);
        }}
      >
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered || isHighlighted ? 1.5 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {(hovered || isHighlighted) && (
        <Html position={[0, 0.45, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div className="px-2.5 py-1 rounded-md bg-[#131418]/95 border border-[#b9c7a5]/40 text-[11px] font-mono text-[#b9c7a5] shadow-md whitespace-nowrap pointer-events-none">
            {skill.name}
            {skill.relatedProjects.length > 0 && (
              <span className="ml-1 text-[9px] text-amber-300">({skill.relatedProjects.length} projs)</span>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

export function SkillsConstellation3D() {
  const groupRef = useRef<THREE.Group>(null);
  const activeSkillFilter = usePortfolioStore((state) => state.activeSkillFilter);
  const hoveredSkillId = usePortfolioStore((state) => state.hoveredSkillId);
  const setHoveredSkillId = usePortfolioStore((state) => state.setHoveredSkillId);

  // Position skills in an organized celestial hemisphere
  const skillNodes = useMemo(() => {
    return SKILLS_DATA.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS_DATA.length);
      const theta = Math.sqrt(SKILLS_DATA.length * Math.PI) * phi;
      const radius = 3.5;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi) * 0.7;
      const z = radius * Math.cos(phi) * 0.8;
      return {
        skill,
        position: [x, y, z] as [number, number, number],
      };
    });
  }, []);

  // Compute constellation lines between adjacent nodes
  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < skillNodes.length; i++) {
      for (let j = i + 1; j < skillNodes.length; j++) {
        const p1 = skillNodes[i].position;
        const p2 = skillNodes[j].position;
        const dist = Math.hypot(p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]);
        // Connect if close or in same category
        if (dist < 2.0 || skillNodes[i].skill.category === skillNodes[j].skill.category && dist < 3.0) {
          lines.push(...p1, ...p2);
        }
      }
    }
    return new Float32Array(lines);
  }, [skillNodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Constellation Connector Filaments */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#b9c7a5" transparent opacity={0.2} />
      </lineSegments>

      {/* Interactive Skill Nodes */}
      {skillNodes.map(({ skill, position }) => {
        const isCatMatch = activeSkillFilter === "All" || skill.category === activeSkillFilter;
        const isHovered = hoveredSkillId === skill.id;
        return (
          <SkillNode
            key={skill.id}
            skill={skill}
            position={position}
            isHighlighted={isHovered || (activeSkillFilter !== "All" && isCatMatch)}
            onSelect={(s) => setHoveredSkillId(s.id === hoveredSkillId ? null : s.id)}
          />
        );
      })}
    </group>
  );
}
