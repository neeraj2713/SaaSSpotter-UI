"use client";

import { formatIndustryTag } from "@/lib/utils";

interface HeroSectionProps {
  industryTag?: string;
  totalCount?: number;
}

export function HeroSection({ industryTag, totalCount }: HeroSectionProps) {
  return (
    <section className="mb-8 space-y-3 sm:mb-10">
      {industryTag ? (
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {formatIndustryTag(industryTag)}{" "}
          <span className="text-muted-foreground">ideas</span>
        </h1>
      ) : (
        <h1 className="font-heading text-2xl font-bold tracking-tight whitespace-nowrap sm:text-4xl lg:text-[2.75rem]">
          Find your next <span className="text-gradient-brand">Micro-SaaS</span> idea
        </h1>
      )}

      <p className="max-w-lg text-muted-foreground">
        {industryTag
          ? `Pain points and startup angles in ${formatIndustryTag(industryTag).toLowerCase()}.`
          : "Real complaints from Reddit, distilled into buildable ideas. Pick one and ship."}
      </p>

      {totalCount !== undefined && totalCount > 0 && (
        <p className="inline-flex items-center gap-2 rounded-full bg-play/15 px-3 py-1 text-sm font-medium text-play-foreground">
          <span className="size-1.5 rounded-full bg-play" />
          {totalCount} ideas ready to explore
        </p>
      )}
    </section>
  );
}
