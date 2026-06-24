"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getPainPointsBatch } from "@/lib/api";
import { formatIndustryTag } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ComparePage() {
  const searchParams = useSearchParams();
  const ids = (searchParams.get("ids") ?? "").split(",").filter(Boolean).slice(0, 3);

  const { data: items = [], isLoading, isError, error } = useQuery({
    queryKey: ["compare", ids],
    queryFn: () => getPainPointsBatch(ids),
    enabled: ids.length > 0,
  });

  if (ids.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-3xl">⚖️</p>
        <h1 className="font-heading mt-4 text-2xl font-bold">Compare ideas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick up to 3 ideas from the feed to compare side by side.
        </p>
        <Link href="/" className={cn(buttonVariants(), "mt-6 rounded-full")}>
          Browse ideas
        </Link>
      </div>
    );
  }

  const rows = [
    { label: "Demand score", key: (v: (typeof items)[0]) => `${v.demand_score}/10` },
    { label: "Industry", key: (v: (typeof items)[0]) => formatIndustryTag(v.industry_tag) },
    { label: "Target customer", key: (v: (typeof items)[0]) => v.target_customer ?? "—" },
    { label: "Competition", key: (v: (typeof items)[0]) => v.competition_level ?? "—" },
    { label: "MVP scope", key: (v: (typeof items)[0]) => v.mvp_complexity ?? "—" },
    { label: "Monetization", key: (v: (typeof items)[0]) => v.monetization_hint ?? "—" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">Compare</h1>
      {isLoading && <p className="mt-4 text-muted-foreground">Loading…</p>}
      {isError && (
        <p className="mt-4 text-sm text-destructive">
          {error instanceof Error ? error.message : "Could not load ideas to compare."}
        </p>
      )}
      {!isLoading && !isError && items.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          No ideas found for the selected IDs. Try adding them again from the feed.
        </p>
      )}
      {!isLoading && !isError && items.length > 0 && (
        <>
          {/* Mobile: stacked cards */}
          <div className="mt-6 space-y-4 md:hidden">
            {items.map((item) => (
              <div key={item.id} className="surface space-y-3 p-4">
                <Link
                  href={`/idea/${item.id}`}
                  className="block font-semibold leading-snug hover:text-primary"
                >
                  {item.core_problem}
                </Link>
                <dl className="space-y-2.5 text-sm">
                  {rows.map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4">
                      <dt className="shrink-0 text-muted-foreground">{row.label}</dt>
                      <dd className="min-w-0 text-right font-medium">{row.key(item)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="surface mt-6 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="p-3 text-left font-medium text-muted-foreground" />
                  {items.map((item) => (
                    <th key={item.id} className="p-3 text-left align-top">
                      <Link href={`/idea/${item.id}`} className="font-semibold hover:text-primary">
                        {item.core_problem.slice(0, 80)}
                        {item.core_problem.length > 80 ? "…" : ""}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-border/50">
                    <td className="p-3 font-medium text-muted-foreground">{row.label}</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-3 align-top">
                        {row.key(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
