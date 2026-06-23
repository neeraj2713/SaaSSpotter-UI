"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getDigest } from "@/lib/api";
import { PainPointGrid } from "@/components/feed/PainPointGrid";
import { cn } from "@/lib/utils";

export function DigestPageContent() {
  const { data, isLoading } = useQuery({
    queryKey: ["digest"],
    queryFn: () => getDigest(7),
    staleTime: 300_000,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted-foreground">
        Loading digest…
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">Weekly digest</h1>
        <p className="text-muted-foreground">
          {data.new_count} new ideas in the last {data.period_days} days
        </p>
      </header>

      {data.top_clusters.length > 0 && (
        <section className="flex flex-wrap gap-2">
          {data.top_clusters.map((c) => (
            <Link
              key={c.slug}
              href={`/?cluster=${c.slug}`}
              className={cn("chip", "hover:border-primary/30")}
            >
              {c.label} · {c.count}
            </Link>
          ))}
        </section>
      )}

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold">Top demand</h2>
        <PainPointGrid items={data.top_by_demand} />
      </section>

      {data.trending.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-lg font-semibold">Trending</h2>
          <PainPointGrid items={data.trending} />
        </section>
      )}
    </div>
  );
}
