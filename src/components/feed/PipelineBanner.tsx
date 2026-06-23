"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { getStats } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface PipelineBannerProps {
  showWhenEmpty?: boolean;
  isEmpty?: boolean;
}

export function PipelineBanner({
  showWhenEmpty = true,
  isEmpty = false,
}: PipelineBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 60_000,
  });

  if (dismissed || !data) return null;
  if (showWhenEmpty && !isEmpty) return null;

  const lastRun = data.last_scrape_at
    ? formatDistanceToNow(new Date(data.last_scrape_at), { addSuffix: true })
    : null;

  return (
    <div className="surface flex items-start gap-3 p-4">
      <Loader2 className="mt-0.5 size-5 shrink-0 animate-spin text-primary" />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-medium text-foreground">
          Fresh ideas land after the daily scrape
        </p>
        <p className="text-sm text-muted-foreground">
          {lastRun
            ? `Last pipeline run ${lastRun}. ${data.total_pain_points} ideas in the feed.`
            : "The pipeline runs daily to surface new pain points from Reddit."}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-9 shrink-0"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
