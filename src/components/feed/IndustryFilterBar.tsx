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
    <section className="space-y-4 rounded-2xl border border-border/40 bg-card/20 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-base font-semibold text-muted-foreground">
        <Filter className="size-5 text-primary" />
        <span>Filter by industry</span>
      </div>

      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex w-max min-w-full flex-wrap gap-2.5 sm:w-auto">
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
  if (active) {
    return (
      <HoverBorderGradient
        as="button"
        containerClassName="rounded-full"
        className="bg-background px-5 py-2 text-base font-semibold text-foreground"
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
        "shrink-0 rounded-full border border-border/60 bg-background/60 px-5 py-2 text-base font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200",
        "hover:border-primary/30 hover:bg-primary/10 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
