"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PainPointCard } from "@/components/feed/PainPointCard";
import type { PainPoint } from "@/lib/types";

interface PainPointGridProps {
  items: PainPoint[];
}

export function PainPointGrid({ items }: PainPointGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {items.map((painPoint, index) => (
        <div
          key={painPoint.id}
          className="group relative block h-full w-full"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute -inset-px block rounded-2xl bg-gradient-to-r from-primary/20 via-violet-500/20 to-indigo-500/20 ring-1 ring-primary/30"
                layoutId="painPointHover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 h-full">
            <PainPointCard painPoint={painPoint} />
          </div>
        </div>
      ))}
    </div>
  );
}
