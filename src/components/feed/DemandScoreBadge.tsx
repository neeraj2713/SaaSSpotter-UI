import { cn, getDemandScoreVariant } from "@/lib/utils";
import { Flame } from "lucide-react";

interface DemandScoreBadgeProps {
  score: number;
  className?: string;
}

const variantStyles = {
  low: {
    badge:
      "from-sky-500/15 to-cyan-600/20 text-sky-300 border-sky-500/25",
    bar: "bg-sky-400",
  },
  medium: {
    badge:
      "from-amber-500/15 to-yellow-600/20 text-amber-300 border-amber-500/25",
    bar: "bg-amber-400",
  },
  high: {
    badge:
      "from-orange-500/20 to-rose-600/25 text-orange-200 border-orange-500/35",
    bar: "bg-gradient-to-r from-orange-400 to-rose-500",
  },
} as const;

export function DemandScoreBadge({ score, className }: DemandScoreBadgeProps) {
  const variant = getDemandScoreVariant(score);

  return (
    <div
      className={cn(
        "flex flex-col items-end gap-1.5",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border bg-gradient-to-r px-2.5 py-0.5 text-xs font-semibold tabular-nums",
          variantStyles[variant].badge,
        )}
      >
        <Flame className="size-3" />
        {score}/10
      </span>
      <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", variantStyles[variant].bar)}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}
