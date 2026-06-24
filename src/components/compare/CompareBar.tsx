"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GitCompare } from "lucide-react";
import { getCompareIds } from "@/lib/compare-ideas";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CompareBar() {
  const [ids, setIds] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : getCompareIds(),
  );

  useEffect(() => {
    const refresh = () => setIds(getCompareIds());
    window.addEventListener("storage", refresh);
    window.addEventListener("compare-ids-changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("compare-ids-changed", refresh);
    };
  }, []);

  if (ids.length === 0) return null;

  return (
    <>
      <div
        className="h-[calc(4rem+env(safe-area-inset-bottom))] shrink-0"
        aria-hidden
      />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/50 bg-background/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <GitCompare className="size-4 text-primary" />
            {ids.length} selected
          </div>
          <Link
            href={`/compare?ids=${ids.join(",")}`}
            className={cn(buttonVariants(), "h-10 rounded-full px-5")}
          >
            Compare
          </Link>
        </div>
      </div>
    </>
  );
}
