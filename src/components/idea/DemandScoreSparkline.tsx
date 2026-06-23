"use client";

import { useQuery } from "@tanstack/react-query";
import { getPainPointScoreHistory } from "@/lib/api";
import { cn } from "@/lib/utils";

interface DemandScoreSparklineProps {
  painPointId: string;
  currentScore: number;
  className?: string;
}

export function DemandScoreSparkline({
  painPointId,
  currentScore,
  className,
}: DemandScoreSparklineProps) {
  const { data: history = [] } = useQuery({
    queryKey: ["score-history", painPointId],
    queryFn: () => getPainPointScoreHistory(painPointId),
    staleTime: 300_000,
  });

  const scores =
    history.length > 0
      ? history.map((entry) => entry.demand_score)
      : [currentScore];

  if (scores.length < 2) return null;

  const width = 120;
  const height = 32;
  const padding = 2;
  const max = 10;
  const min = 1;
  const range = max - min || 1;

  const points = scores
    .map((score, index) => {
      const x =
        padding +
        (index / (scores.length - 1)) * (width - padding * 2);
      const y =
        height -
        padding -
        ((score - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-primary", className)}
      aria-label="Demand score history"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
