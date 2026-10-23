"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { usePortfolioStore } from "@/store/usePortfolioStore";

interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#060916] overflow-hidden pointer-events-none">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="cosmic-grid absolute inset-0 opacity-40" />
    </div>
  );
}

function LoadingSpinner() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="#42E8FF" wireframe />
    </mesh>
  );
}

export function SceneContainer({
  children,
  className = "w-full h-full",
  cameraPosition = [0, 0, 7],
  fov = 45,
}: SceneContainerProps) {
  const [hasWebGL] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch {
      return false;
    }
  });
  const qualityLevel = usePortfolioStore((state) => state.qualityLevel);
  const isReducedMotion = usePortfolioStore((state) => state.isReducedMotion);

  if (hasWebGL === false) {
    return <WebGLFallback />;
  }

  const dpr: [number, number] = qualityLevel === "high" ? [1, 1.8] : [1, 1.2];

  return (
    <div className={`relative ${className}`}>
      {hasWebGL && (
        <Canvas
          camera={{ position: cameraPosition, fov }}
          dpr={dpr}
          gl={{
            antialias: qualityLevel !== "low",
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="pointer-events-auto"
        >
          <Suspense fallback={<LoadingSpinner />}>
            {!isReducedMotion && children}
            {isReducedMotion && (
              <ambientLight intensity={0.5} />
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
