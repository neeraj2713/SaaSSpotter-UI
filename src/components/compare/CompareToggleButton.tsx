"use client";

import { useEffect, useState } from "react";
import { GitCompare } from "lucide-react";
import { getCompareIds, toggleCompareId } from "@/lib/compare-ideas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CompareToggleButtonProps {
  painPointId: string;
  className?: string;
  iconOnly?: boolean;
}

export function CompareToggleButton({
  painPointId,
  className,
  iconOnly = false,
}: CompareToggleButtonProps) {
  const [ids, setIds] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : getCompareIds(),
  );
  const active = ids.includes(painPointId);

  useEffect(() => {
    const refresh = () => setIds(getCompareIds());
    window.addEventListener("compare-ids-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("compare-ids-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (iconOnly) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "size-9 shrink-0",
          active && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
          className,
        )}
        aria-label={active ? "Remove from compare" : "Add to compare"}
        aria-pressed={active}
        onClick={() => setIds(toggleCompareId(painPointId))}
      >
        <GitCompare className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("min-h-11 gap-2", active && "border-primary text-primary", className)}
      onClick={() => setIds(toggleCompareId(painPointId))}
    >
      <GitCompare className="size-4" />
      {active ? "Comparing" : "Compare"}
    </Button>
  );
}
