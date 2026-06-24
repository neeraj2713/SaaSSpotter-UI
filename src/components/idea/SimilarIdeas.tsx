"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getSimilarPainPoints } from "@/lib/api";
import { DemandScoreBadge } from "@/components/feed/DemandScoreBadge";
import { formatIndustryTag } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SimilarIdeasProps {
  painPointId: string;
}

export function SimilarIdeas({ painPointId }: SimilarIdeasProps) {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["similar", painPointId],
    queryFn: () => getSimilarPainPoints(painPointId, 5),
  });

  if (isLoading) {
    return (
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Similar ideas</h2>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl border border-border/40 bg-muted/30"
            />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="min-w-0 space-y-4">
      <h2 className="text-lg font-semibold">Similar ideas</h2>
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/idea/${item.id}`}
            className="block w-[min(260px,80vw)] shrink-0 snap-start rounded-xl border border-border/50 bg-card/80 p-4 transition-colors hover:border-primary/30 hover:bg-card lg:w-auto lg:min-w-0"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <Badge variant="outline" className="text-xs">
                {formatIndustryTag(item.industry_tag)}
              </Badge>
              <DemandScoreBadge score={item.demand_score} />
            </div>
            <p className="line-clamp-2 break-words text-sm font-medium leading-relaxed">
              {item.core_problem}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
