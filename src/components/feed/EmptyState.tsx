import { Radar, SearchX, Sparkles } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  filtered?: boolean;
}

export function EmptyState({ filtered = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-border/60 bg-card/40 px-6 py-20 text-center backdrop-blur-sm">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
        {filtered ? (
          <SearchX className="size-8 text-primary/70" />
        ) : (
          <Radar className="size-8 text-primary/70" />
        )}
      </div>
      <div className="max-w-sm space-y-2">
        <p className="text-xl font-bold">
          {filtered ? "No ideas in this category" : "No pain points spotted yet"}
        </p>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {filtered ? (
            <>
              Try browsing{" "}
              <Link href="/" className="font-medium text-primary hover:underline">
                all industries
              </Link>{" "}
              or pick a different filter.
            </>
          ) : (
            "Our pipeline runs daily at 6 AM UTC. Check back soon for fresh Micro-SaaS ideas."
          )}
        </p>
      </div>
      {!filtered && (
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-5 py-2.5 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-primary" />
          Sourced from Reddit · Validated by AI
        </div>
      )}
    </div>
  );
}
