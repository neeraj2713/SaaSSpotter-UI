"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Bell, ChevronDown, Search } from "lucide-react";
import type { SortField } from "@/lib/types";
import { cn, formatIndustryTag } from "@/lib/utils";
import { useCreateWatch } from "@/components/alerts/AlertsPageContent";

interface FeedToolbarProps {
  industryTag?: string;
  total?: number;
}

export function FeedToolbar({ industryTag, total }: FeedToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();
  const createWatch = useCreateWatch();

  const urlQ = searchParams.get("q") ?? "";
  const urlSort = (searchParams.get("sort") as SortField) ?? "created_at";
  const urlTrending = searchParams.get("trending") === "true";

  const [draftQ, setDraftQ] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayQ = draftQ ?? urlQ;

  function pushParams(next: { q?: string; sort?: SortField; trending?: boolean }) {
    const params = new URLSearchParams();
    const q = next.q ?? urlQ;
    const sort = next.sort ?? urlSort;
    const trending = next.trending ?? urlTrending;

    if (q.trim().length >= 2) params.set("q", q.trim());
    if (sort !== "created_at") params.set("sort", sort);
    if (trending) params.set("trending", "true");

    const qs = params.toString();
    const base = industryTag ? `/tag/${industryTag}` : "/";
    router.replace(qs ? `${base}?${qs}` : base, { scroll: false });
  }

  function handleQueryChange(value: string) {
    setDraftQ(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      pushParams({ q: value });
      setDraftQ(null);
    }, 300);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="surface space-y-3 p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={displayQ}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search ideas…"
            className="h-10 w-full rounded-full border border-border/60 bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative shrink-0">
            <select
              value={urlSort}
              onChange={(e) => pushParams({ sort: e.target.value as SortField })}
              className="h-10 w-auto appearance-none rounded-full border border-border/60 bg-background py-0 pl-3.5 pr-8 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
              aria-label="Sort by"
            >
              <option value="created_at">Newest</option>
              <option value="demand_score">Top demand</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>

          <button
            type="button"
            onClick={() => pushParams({ trending: !urlTrending })}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
              urlTrending
                ? "border-play/40 bg-play/15 text-play-foreground"
                : "border-border/60 bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            Trending
          </button>

          {(urlQ.length >= 2 || industryTag) && (
            <button
              type="button"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border/60 px-4 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
              onClick={() => {
                if (!isSignedIn) {
                  window.location.href = "/sign-in";
                  return;
                }
                createWatch.mutate({
                  keywords: urlQ.length >= 2 ? [urlQ.trim()] : [],
                  tags: industryTag ? [industryTag] : [],
                  label: industryTag
                    ? `Tag: ${formatIndustryTag(industryTag)}`
                    : `Search: ${urlQ.trim()}`,
                });
              }}
            >
              <Bell className="size-4" />
              Watch
            </button>
          )}
        </div>
      </div>

      {typeof total === "number" && (
        <p className="text-xs text-muted-foreground">
          {total} {total === 1 ? "result" : "results"}
        </p>
      )}
    </div>
  );
}
