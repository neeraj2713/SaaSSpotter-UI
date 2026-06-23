"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn, COMMON_INDUSTRY_TAGS, formatIndustryTag } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";

interface IndustryFilterBarProps {
  activeTag?: string;
  discoveredTags: string[];
}

export function IndustryFilterBar({
  activeTag,
  discoveredTags,
}: IndustryFilterBarProps) {
  const router = useRouter();

  const allTags = Array.from(
    new Set([
      ...COMMON_INDUSTRY_TAGS,
      ...discoveredTags,
      ...(activeTag ? [activeTag] : []),
    ]),
  ).sort();

  function handleSelect(tag?: string) {
    if (!tag) {
      router.push("/");
      return;
    }
    router.push(`/tag/${tag}`);
  }

  return (
    <section className="space-y-3 rounded-2xl border border-border/40 bg-card/20 p-4 backdrop-blur-sm sm:space-y-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground sm:text-base">
        <Filter className="size-4 shrink-0 text-primary sm:size-5" />
        <span>Filter by industry</span>
      </div>

      <div className="relative -mx-1">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
          <FilterChip
            label="All"
            active={!activeTag}
            onClick={() => handleSelect()}
          />
          {allTags.map((tag) => (
            <FilterChip
              key={tag}
              label={formatIndustryTag(tag)}
              active={activeTag === tag}
              onClick={() => handleSelect(tag)}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/80 to-transparent sm:hidden" />
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const chipClassName = cn(
    "shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium sm:px-5 sm:text-base",
    "min-h-11 touch-manipulation",
  );

  if (active) {
    return (
      <HoverBorderGradient
        as="button"
        containerClassName="rounded-full shrink-0 snap-start"
        className={cn(chipClassName, "bg-background font-semibold text-foreground")}
        onClick={onClick}
      >
        {label}
      </HoverBorderGradient>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        chipClassName,
        "border border-border/60 bg-background/60 text-muted-foreground backdrop-blur-sm transition-all duration-200",
        "hover:border-primary/30 hover:bg-primary/10 hover:text-foreground active:scale-95",
      )}
    >
      {label}
    </button>
  );
}
