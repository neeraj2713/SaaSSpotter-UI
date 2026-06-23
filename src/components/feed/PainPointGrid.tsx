"use client";

import { motion } from "motion/react";
import { PainPointCard } from "@/components/feed/PainPointCard";
import type { PainPoint } from "@/lib/types";

interface PainPointGridProps {
  items: PainPoint[];
}

export function PainPointGrid({ items }: PainPointGridProps) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((painPoint, index) => (
        <motion.div
          key={painPoint.id}
          className="flex h-full min-h-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.24) }}
        >
          <PainPointCard painPoint={painPoint} />
        </motion.div>
      ))}
    </div>
  );
}
