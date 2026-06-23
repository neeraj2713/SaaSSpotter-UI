"use client";

import { Suspense, useMemo, useState } from "react";
import { NewSinceVisitBanner } from "@/components/feed/NewSinceVisitBanner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPainPoints } from "@/lib/api";
import type { SortField } from "@/lib/types";
import { HeroSection } from "@/components/feed/HeroSection";
import { PainPointGrid } from "@/components/feed/PainPointGrid";
import { IndustryFilterBar } from "@/components/feed/IndustryFilterBar";
import { FeedToolbar } from "@/components/feed/FeedToolbar";
import { PipelineBanner } from "@/components/feed/PipelineBanner";
import { PaginationControls } from "@/components/feed/PaginationControls";
import { EmptyState } from "@/components/feed/EmptyState";
import { FeedSkeleton } from "@/components/feed/FeedSkeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const PAGE_SIZE = 20;

interface FeedPageProps {
  industryTag?: string;
}

export function FeedPage({ industryTag }: FeedPageProps) {
  const searchParams = useSearchParams();
  const cluster = searchParams.get("cluster") ?? undefined;
  const since = searchParams.get("since") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const sort = (searchParams.get("sort") as SortField) ?? "created_at";
  const trending = searchParams.get("trending") === "true";

  const filterKey = useMemo(
    () => `${industryTag ?? ""}|${q ?? ""}|${sort}|${trending}|${cluster ?? ""}|${since ?? ""}`,
    [industryTag, q, sort, trending, cluster, since],
  );

  const [pageByFilter, setPageByFilter] = useState<Record<string, number>>({});
  const page = pageByFilter[filterKey] ?? 1;

  const setPage = (nextPage: number) => {
    setPageByFilter((prev) => ({ ...prev, [filterKey]: nextPage }));
  };

  const queryKey = useMemo(
    () => [
      "painpoints",
      { page, page_size: PAGE_SIZE, industry_tag: industryTag, q, sort, trending, cluster, since },
    ],
    [page, industryTag, q, sort, trending, cluster, since],
  );

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getPainPoints({
        page,
        page_size: PAGE_SIZE,
        industry_tag: industryTag,
        cluster,
        q: q && q.length >= 2 ? q : undefined,
        sort,
        order: "desc",
        trending: trending || undefined,
        since,
      }),
    placeholderData: keepPreviousData,
  });

  const showSkeleton = isLoading && !data;
  const showFetchingOverlay = isFetching && !isLoading && !!data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HeroSection industryTag={industryTag} totalCount={data?.total} />

      <div className="space-y-5">
        <FeedToolbar industryTag={industryTag} total={data?.total} />
        <IndustryFilterBar activeTag={industryTag} />

        <Suspense fallback={null}>
          <NewSinceVisitBanner />
        </Suspense>

        <PipelineBanner isEmpty={!showSkeleton && !!data && data.items.length === 0} />

        {isError && (
          <div className="surface flex flex-col items-start gap-3 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
              <div className="space-y-1">
                <p className="font-medium">Couldn&apos;t load ideas</p>
                <p className="text-sm text-muted-foreground">
                  {error instanceof Error
                    ? error.message
                    : "Check your connection and retry."}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        )}

        {showSkeleton && <FeedSkeleton />}

        {!showSkeleton && data && data.items.length === 0 && (
          <EmptyState filtered={Boolean(industryTag || q || trending)} />
        )}

        {!showSkeleton && data && data.items.length > 0 && (
          <div className={showFetchingOverlay ? "opacity-60 transition-opacity" : ""}>
            <PainPointGrid items={data.items} />
            <PaginationControls
              page={data.page}
              pageSize={data.page_size}
              total={data.total}
              hasNext={data.has_next}
              isLoading={isFetching}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
