import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemandScoreBadge } from "@/components/feed/DemandScoreBadge";
import { formatIndustryTag } from "@/lib/utils";
import type { PainPoint } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, Lightbulb, MessageSquareQuote } from "lucide-react";
import Link from "next/link";

interface PainPointCardProps {
  painPoint: PainPoint;
}

export function PainPointCard({ painPoint }: PainPointCardProps) {
  const relativeTime = formatDistanceToNow(new Date(painPoint.created_at), {
    addSuffix: true,
  });

  return (
    <Card className="group flex h-full flex-col rounded-2xl border-border/60 bg-card/90 text-sm shadow-lg backdrop-blur-md transition-transform duration-300 motion-safe:hover:translate-y-[-2px]">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0 pb-3 sm:gap-3">
        <Link href={`/tag/${painPoint.industry_tag}`} className="max-w-[65%] sm:max-w-none">
          <Badge
            variant="outline"
            className="cursor-pointer truncate border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs text-primary hover:bg-primary/15 hover:text-primary"
          >
            {formatIndustryTag(painPoint.industry_tag)}
          </Badge>
        </Link>
        <DemandScoreBadge score={painPoint.demand_score} />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 sm:gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <MessageSquareQuote className="size-3.5 shrink-0" />
            Pain point
          </div>
          <p className="text-base font-semibold leading-relaxed text-foreground">
            {painPoint.core_problem}
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-border/50 bg-muted/30 p-3.5 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Micro-SaaS ideas
          </p>
          <ul className="space-y-3">
            <li className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Lightbulb className="size-3.5" />
              </span>
              <span className="min-w-0 break-words">{painPoint.saas_idea_1}</span>
            </li>
            <li className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Lightbulb className="size-3.5" />
              </span>
              <span className="min-w-0 break-words">{painPoint.saas_idea_2}</span>
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex-col items-start gap-2 border-t border-border/40 bg-muted/20 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <time dateTime={painPoint.created_at} className="text-xs text-muted-foreground">
          {relativeTime}
        </time>
        <a
          href={painPoint.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary/80 transition-colors hover:text-primary active:text-primary"
        >
          View source
          <ArrowUpRight className="size-3.5" />
        </a>
      </CardFooter>
    </Card>
  );
}
