import { cn, getDemandScoreVariant } from "@/lib/utils";

interface DemandScoreBadgeProps {
  score: number;
  className?: string;
  size?: "sm" | "lg";
  variant?: "default" | "minimal";
}

const dotColors = {
  low: "bg-sky-400",
  medium: "bg-amber-400",
  high: "bg-orange-500",
} as const;

const pillColors = {
  low: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  medium: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  high: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
} as const;

export function DemandScoreBadge({
  score,
  className,
  size = "sm",
  variant = "default",
}: DemandScoreBadgeProps) {
  const level = getDemandScoreVariant(score);
  const isLarge = size === "lg";

  if (variant === "minimal") {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
          pillColors[level],
          className,
        )}
        title={`Demand score ${score}/10`}
      >
        <span className={cn("size-1.5 rounded-full", dotColors[level])} />
        {score}
      </span>
    );
  }

  return (
    <div className={cn("flex flex-col items-end gap-2", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-semibold tabular-nums",
          pillColors[level],
          isLarge ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs",
        )}
      >
        <span className={cn("size-2 rounded-full", dotColors[level])} />
        {score}/10
      </span>
      <div
        className={cn(
          "overflow-hidden rounded-full bg-muted",
          isLarge ? "h-1 w-20" : "h-0.5 w-14",
        )}
      >
        <div
          className={cn("h-full rounded-full", dotColors[level])}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}
