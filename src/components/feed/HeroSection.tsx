"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { formatIndustryTag } from "@/lib/utils";
import { Sparkles, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  industryTag?: string;
  totalCount?: number;
}

export function HeroSection({ industryTag, totalCount }: HeroSectionProps) {
  const heroWords = industryTag
    ? `${formatIndustryTag(industryTag)} ideas`
    : "Spot your next Micro-SaaS idea";

  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl border border-border/50 bg-card/20 p-8 sm:p-12">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#a78bfa"
      />

      <div className="pointer-events-none absolute inset-0 h-full w-full">
        <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={1.2}
          particleDensity={60}
          className="h-full w-full"
          particleColor="#a78bfa"
          speed={0.5}
        />
      </div>

      <div className="relative z-10 space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
          <Sparkles className="size-4" />
          AI-validated opportunities
        </div>

        {industryTag ? (
          <h2 className="font-heading max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="text-gradient-brand">
              {formatIndustryTag(industryTag)}
            </span>{" "}
            ideas
          </h2>
        ) : (
          <TextGenerateEffect
            words={heroWords}
            wordsClassName="font-heading max-w-2xl text-4xl font-extrabold sm:text-5xl"
            duration={0.4}
          />
        )}

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {industryTag
            ? `Browsing pain points and startup ideas in ${formatIndustryTag(industryTag).toLowerCase()}.`
            : "Real business complaints from Reddit, filtered by AI, turned into actionable startup ideas."}
        </p>

        {totalCount !== undefined && totalCount > 0 && (
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            <TrendingUp className="size-5 text-primary" />
            <span>
              <span className="font-semibold text-foreground">{totalCount}</span>{" "}
              validated opportunities
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
