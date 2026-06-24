import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DemandScoreBadge } from "@/components/feed/DemandScoreBadge";
import { TrendingBadge } from "@/components/feed/TrendingBadge";
import { SaveIdeaButton } from "@/components/idea/SaveIdeaButton";
import { CompareToggleButton } from "@/components/compare/CompareToggleButton";
import { formatIndustryTag, isTrending } from "@/lib/utils";
import type { PainPoint } from "@/lib/types";

interface PainPointCardProps {
  painPoint: PainPoint;
}

export function PainPointCard({ painPoint }: PainPointCardProps) {
  const relativeTime = formatDistanceToNow(new Date(painPoint.created_at), {
    addSuffix: true,
  });

  return (
    <Card className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border-border/50 bg-card shadow-sm">
      <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            <Link
              href={`/tag/${painPoint.industry_tag}`}
              className="chip chip-active max-w-full truncate !px-2.5 !py-1 !text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              {formatIndustryTag(painPoint.industry_tag)}
            </Link>
            {isTrending(painPoint) && <TrendingBadge />}
          </div>
          <DemandScoreBadge score={painPoint.demand_score} variant="minimal" />
        </div>

        <Link href={`/idea/${painPoint.id}`} className="block flex-1 space-y-2">
          <h3 className="font-heading line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-[1.05rem]">
            {painPoint.core_problem}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {painPoint.saas_idea_1}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 bg-muted/30 px-4 py-2.5">
        <time
          dateTime={painPoint.created_at}
          className="min-w-0 shrink truncate text-xs text-muted-foreground"
        >
          {relativeTime}
        </time>
        <div className="flex shrink-0 items-center gap-0.5">
          <SaveIdeaButton painPointId={painPoint.id} iconOnly />
          <CompareToggleButton painPointId={painPoint.id} iconOnly />
          <Link
            href={`/idea/${painPoint.id}`}
            className="inline-flex size-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 sm:size-auto sm:gap-0.5 sm:px-2.5 sm:py-1.5"
            aria-label="Open idea"
          >
            <span className="hidden text-sm font-medium sm:inline">Open</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
