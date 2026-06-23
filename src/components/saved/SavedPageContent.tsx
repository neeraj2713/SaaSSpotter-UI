"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getPainPointsBatch, getSavedIds } from "@/lib/api";
import { PainPointGrid } from "@/components/feed/PainPointGrid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SavedPageContent() {
  const { data: ids = [], isLoading: loadingIds } = useQuery({
    queryKey: ["saved-ids"],
    queryFn: getSavedIds,
  });

  const { data: items = [], isLoading: loadingItems } = useQuery({
    queryKey: ["saved-items", ids],
    queryFn: () => getPainPointsBatch(ids),
    enabled: ids.length > 0,
  });

  if (loadingIds) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted-foreground">
        Loading saved ideas…
      </div>
    );
  }

  if (ids.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-3xl">🔖</p>
        <h1 className="font-heading mt-4 text-2xl font-bold">No saves yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tap the bookmark on any idea to save it here.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants(), "mt-6 rounded-full")}
        >
          Browse ideas
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="font-heading mb-6 text-2xl font-bold">Saved</h1>
      {loadingItems ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <PainPointGrid items={items} />
      )}
    </div>
  );
}
