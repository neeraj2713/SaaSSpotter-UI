import { DotPattern } from "@/components/ui/dot-pattern";

export function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,oklch(0.52_0.19_265/0.08),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,oklch(0.72_0.16_265/0.12),transparent)]" />
      <DotPattern />
    </div>
  );
}
