"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Bell, Trash2 } from "lucide-react";
import { createWatch, deleteWatch, getPainPoints, getWatches } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { formatIndustryTag } from "@/lib/utils";

export function AlertsPageContent() {
  const { isSignedIn } = useAuth();
  const queryClient = useQueryClient();

  const { data: watches = [], isLoading } = useQuery({
    queryKey: ["watches"],
    queryFn: getWatches,
    enabled: isSignedIn,
  });

  const { data: feed } = useQuery({
    queryKey: ["painpoints", "alerts-feed"],
    queryFn: () => getPainPoints({ page: 1, page_size: 50 }),
    enabled: watches.length > 0,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWatch,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watches"] }),
  });

  const matches =
    feed?.items.filter((item) =>
      watches.some((watch) => {
        const keywordHit = watch.keywords.some((kw) =>
          `${item.core_problem} ${item.saas_idea_1} ${item.saas_idea_2}`
            .toLowerCase()
            .includes(kw.toLowerCase()),
        );
        const tagHit =
          watch.tags.includes(item.industry_tag) ||
          (item.industry_tags ?? []).some((t) => watch.tags.includes(t));
        return keywordHit || tagHit;
      }),
    ) ?? [];

  if (isLoading) {
    return <div className="p-12 text-center text-muted-foreground">Loading alerts…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <h1 className="font-heading flex items-center gap-2 text-2xl font-bold">
          <Bell className="size-5 text-primary" />
          Alerts
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Watches from your searches and filters.
        </p>
      </header>

      {watches.length === 0 ? (
        <p className="text-muted-foreground">
          No watches yet. Use &ldquo;Watch this search&rdquo; on the feed when filtering.
        </p>
      ) : (
        <ul className="space-y-3">
          {watches.map((watch) => (
            <li
              key={watch.id}
              className="surface flex items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{watch.label ?? "Custom watch"}</p>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {watch.keywords.length > 0 && `Keywords: ${watch.keywords.join(", ")}`}
                  {watch.tags.length > 0 &&
                    ` Tags: ${watch.tags.map(formatIndustryTag).join(", ")}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 shrink-0"
                onClick={() => deleteMutation.mutate(watch.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {matches.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Matching ideas</h2>
          <ul className="space-y-2">
            {matches.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/idea/${item.id}`}
                  className="surface block p-3 transition-colors hover:border-primary/30"
                >
                  {item.core_problem}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export function useCreateWatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWatch,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watches"] }),
  });
}
