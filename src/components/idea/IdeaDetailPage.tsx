"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, ArrowUpRight, Lightbulb } from "lucide-react";
import type { PainPointDetail } from "@/lib/types";
import { formatIndustryTag, isTrending } from "@/lib/utils";
import { DemandScoreBadge } from "@/components/feed/DemandScoreBadge";
import { TrendingBadge } from "@/components/feed/TrendingBadge";
import { IdeaQualityBadges } from "@/components/idea/IdeaQualityBadges";
import { ShareButtons } from "@/components/idea/ShareButtons";
import { SaveIdeaButton } from "@/components/idea/SaveIdeaButton";
import { CompareToggleButton } from "@/components/compare/CompareToggleButton";
import { MvpBlueprintButton } from "@/components/idea/MvpBlueprintButton";
import { EvidencePanel } from "@/components/idea/EvidencePanel";
import { ScoreExplainer } from "@/components/idea/ScoreExplainer";
import { EngagementSignal } from "@/components/idea/EngagementSignal";
import { SimilarIdeas } from "@/components/idea/SimilarIdeas";
import { DemandScoreSparkline } from "@/components/idea/DemandScoreSparkline";

interface IdeaDetailPageProps {
  painPoint: PainPointDetail;
}

export function IdeaDetailPage({ painPoint }: IdeaDetailPageProps) {
  const relativeTime = formatDistanceToNow(new Date(painPoint.created_at), {
    addSuffix: true,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <article className="space-y-8">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/tag/${painPoint.industry_tag}`}
                className="chip chip-active !text-xs"
              >
                {formatIndustryTag(painPoint.industry_tag)}
              </Link>
              {painPoint.cluster_slug && (
                <Link
                  href={`/?cluster=${painPoint.cluster_slug}`}
                  className="chip !text-xs"
                >
                  {painPoint.cluster_label}
                </Link>
              )}
              {isTrending(painPoint) && <TrendingBadge />}
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
                {painPoint.core_problem}
              </h1>
              <div className="flex flex-col items-end gap-2">
                <DemandScoreBadge score={painPoint.demand_score} size="lg" />
                <DemandScoreSparkline
                  painPointId={painPoint.id}
                  currentScore={painPoint.demand_score}
                  className="h-6 w-[100px]"
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">Found {relativeTime}</p>
          </header>

          <div className="space-y-6">
            <EngagementSignal signal={painPoint.engagement_signal ?? ""} />
            <ScoreExplainer
              rationale={painPoint.demand_score_rationale ?? []}
              score={painPoint.demand_score}
            />
            <EvidencePanel painPoint={painPoint} />
            <IdeaQualityBadges painPoint={painPoint} variant="expanded" />
          </div>

          <section className="space-y-3">
            <h2 className="font-heading text-lg font-semibold">Ideas to build</h2>
            <ul className="space-y-3">
              {[painPoint.saas_idea_1, painPoint.saas_idea_2].map((idea, i) => (
                <li
                  key={i}
                  className="surface flex gap-3 p-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Lightbulb className="size-4" />
                  </span>
                  <p className="text-sm leading-relaxed sm:text-base">{idea}</p>
                </li>
              ))}
            </ul>
          </section>

          <MvpBlueprintButton painPoint={painPoint} />

          <div className="flex flex-wrap items-center gap-2">
            <SaveIdeaButton painPointId={painPoint.id} />
            <CompareToggleButton painPointId={painPoint.id} />
            <a
              href={painPoint.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="chip gap-1 !border-transparent hover:!border-border/60"
            >
              Source
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <ShareButtons painPoint={painPoint} />
        </article>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <SimilarIdeas painPointId={painPoint.id} />
        </aside>
      </div>
    </div>
  );
}
