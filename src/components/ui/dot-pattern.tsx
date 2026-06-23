import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

/** Subtle dot grid — inspired by Magic UI, zero runtime deps */
export function DotPattern({
  className,
  width = 20,
  height = 20,
  cx = 1,
  cy = 1,
  cr = 0.8,
}: DotPatternProps) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-foreground/[0.07] dark:text-foreground/[0.05]",
        className,
      )}
    >
      <defs>
        <pattern
          id="dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={cx}
          y={cy}
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  );
}
