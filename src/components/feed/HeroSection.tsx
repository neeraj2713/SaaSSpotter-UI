"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { formatIndustryTag } from "@/lib/utils";
import { Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  industryTag?: string;
  totalCount?: number;
}

export function HeroSection({ industryTag, totalCount }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const heroWords = industryTag
    ? `${formatIndustryTag(industryTag)} ideas`
    : "Spot your next Micro-SaaS idea";

  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-border/50 bg-card/20 p-5 sm:mb-10 sm:rounded-3xl sm:p-8 lg:p-12">
      <Spotlight
        className="-top-40 left-0 hidden sm:block md:-top-20 md:left-60"
        fill="#a78bfa"
      />

      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 h-full w-full">
          <SparklesCore
            background="transparent"
            minSize={0.3}
            maxSize={1.2}
            particleDensity={isMobile ? 25 : 60}
            className="h-full w-full"
            particleColor="#a78bfa"
            speed={0.5}
          />
        </div>
      )}

      <div className="relative z-10 space-y-3 sm:space-y-5">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
          <Sparkles className="size-3.5 shrink-0 sm:size-4" />
          <span className="truncate">AI-validated opportunities</span>
        </div>

        {industryTag ? (
          <h2 className="font-heading max-w-2xl text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-gradient-brand">
              {formatIndustryTag(industryTag)}
            </span>{" "}
            ideas
          </h2>
        ) : (
          <TextGenerateEffect
            words={heroWords}
            wordsClassName="font-heading max-w-2xl text-2xl font-extrabold sm:text-4xl lg:text-5xl"
            duration={0.4}
          />
        )}

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
          {industryTag
            ? `Browsing pain points and startup ideas in ${formatIndustryTag(industryTag).toLowerCase()}.`
            : "Real business complaints from Reddit, filtered by AI, turned into actionable startup ideas."}
        </p>

        {totalCount !== undefined && totalCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
            <TrendingUp className="size-4 shrink-0 text-primary sm:size-5" />
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
