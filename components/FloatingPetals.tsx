"use client";

import { useMemo } from "react";

interface PetalConfig {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: string;
}

function generatePetals(count: number): PetalConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = (i * 7 + 3) % 100;
    return {
      id: i,
      left: `${(seed * 1.01) % 100}%`,
      size: `${12 + (seed % 10)}px`,
      duration: `${7 + (seed % 6)}s`,
      delay: `${seed % 8}s`,
      opacity: `${0.35 + ((seed % 3) * 0.1)}`,
    };
  });
}

export default function FloatingPetals() {
  const petals = useMemo(() => generatePetals(14), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            position: "absolute",
            bottom: "-20px",
            left: p.left,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
            userSelect: "none",
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}
