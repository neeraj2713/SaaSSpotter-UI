"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = ({
  className,
  particleColor = "#a78bfa",
  particleDensity = 50,
  minSize = 0.4,
  maxSize = 1.2,
  speed = 1,
}: SparklesCoreProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: particleDensity }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: minSize + Math.random() * (maxSize - minSize),
        duration: (Math.random() * 2 + 2) / speed,
        delay: Math.random() * 2,
      })),
    [particleDensity, minSize, maxSize, speed],
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 4}px`,
            height: `${particle.size * 4}px`,
            backgroundColor: particleColor,
            boxShadow: `0 0 ${particle.size * 6}px ${particleColor}`,
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
