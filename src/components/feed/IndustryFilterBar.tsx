"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getIndustryTags } from "@/lib/api";
import { cn, COMMON_INDUSTRY_TAGS, formatIndustryTag } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface IndustryFilterBarProps {
  activeTag?: string;
}

const PREVIEW_TAG_COUNT = 5;

export function IndustryFilterBar({ activeTag }: IndustryFilterBarProps) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const suffix = queryString ? `?${queryString}` : "";

  const { data } = useQuery({
    queryKey: ["industry-tags"],
    queryFn: getIndustryTags,
    staleTime: 300_000,
  });

  const tags =
    data?.tags ?? COMMON_INDUSTRY_TAGS.map((tag) => ({ tag, count: 0 }));

  const visibleTags = useMemo(() => {
    if (expanded) return tags;

    const preview = tags.slice(0, PREVIEW_TAG_COUNT);

    if (activeTag && !preview.some(({ tag }) => tag === activeTag)) {
      const active = tags.find(({ tag }) => tag === activeTag);
      if (active) {
        if (preview.length >= PREVIEW_TAG_COUNT) {
          preview[PREVIEW_TAG_COUNT - 1] = active;
        } else {
          preview.push(active);
        }
      }
    }

    return preview;
  }, [tags, activeTag, expanded]);

  const hiddenCount = Math.max(0, tags.length - visibleTags.length);

  function handleSelect(tag?: string) {
    if (!tag) {
      router.push(suffix ? `/${suffix}` : "/");
      return;
    }
    router.push(`/tag/${tag}${suffix}`);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Industry
        </p>
        {tags.length > PREVIEW_TAG_COUNT && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {expanded ? "Less" : "More"}
            <ChevronDown
              className={cn("size-3.5 transition-transform", expanded && "rotate-180")}
            />
          </button>
        )}
      </div>

      <div
        className={cn(
          "scrollbar-hide flex flex-wrap gap-2",
          expanded && "max-h-40 overflow-y-auto",
        )}
      >
        <FilterChip label="All" active={!activeTag} onClick={() => handleSelect()} />
        {visibleTags.map(({ tag, count }) => (
          <FilterChip
            key={tag}
            label={formatIndustryTag(tag)}
            count={count}
            active={activeTag === tag}
            onClick={() => handleSelect(tag)}
          />
        ))}
        {!expanded && hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="chip border-dashed text-primary hover:border-primary/40 hover:bg-primary/5"
          >
            +{hiddenCount}
          </button>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn("chip max-w-[200px] truncate", active && "chip-active")}
    >
      {label}
      {typeof count === "number" && count > 0 && (
        <span className="ml-1 opacity-60">{count}</span>
      )}
    </button>
  );
}
