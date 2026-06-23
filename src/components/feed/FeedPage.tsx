"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useDiscoveredTags } from "@/components/providers/DiscoveredTagsProvider";
import { getPainPoints } from "@/lib/api";
import { HeroSection } from "@/components/feed/HeroSection";
import { PainPointGrid } from "@/components/feed/PainPointGrid";
import { IndustryFilterBar } from "@/components/feed/IndustryFilterBar";
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
  const [page, setPage] = useState(1);
  const { tags: discoveredTags, addTags } = useDiscoveredTags();

  useEffect(() => {
    setPage(1);
  }, [industryTag]);

  const queryKey = useMemo(
    () => ["painpoints", { page, page_size: PAGE_SIZE, industry_tag: industryTag }],
    [page, industryTag],
  );

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getPainPoints({
        page,
        page_size: PAGE_SIZE,
        industry_tag: industryTag,
      }),
  });

  useEffect(() => {
    if (!data?.items.length) return;
    addTags(data.items.map((item) => item.industry_tag));
  }, [data?.items, addTags]);

  const showSkeleton = isLoading && !data;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <BackgroundBeams className="opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <HeroSection industryTag={industryTag} totalCount={data?.total} />

        <div className="space-y-8">
          <IndustryFilterBar
            activeTag={industryTag}
            discoveredTags={discoveredTags}
          />

          {isError && (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                <div className="space-y-1">
                  <p className="font-medium">Couldn&apos;t load ideas</p>
                  <p className="text-base text-muted-foreground">
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
            <EmptyState filtered={Boolean(industryTag)} />
          )}

          {!showSkeleton && data && data.items.length > 0 && (
            <>
              <PainPointGrid items={data.items} />

              <PaginationControls
                page={data.page}
                pageSize={data.page_size}
                total={data.total}
                hasNext={data.has_next}
                isLoading={isFetching}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
