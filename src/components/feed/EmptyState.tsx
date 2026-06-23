import { Search } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  filtered?: boolean;
}

export function EmptyState({ filtered = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/60 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-2xl">
        {filtered ? <Search className="size-6 text-muted-foreground" /> : "👀"}
      </div>
      <div className="max-w-sm space-y-1">
        <p className="font-heading text-lg font-semibold">
          {filtered ? "No matches" : "Nothing here yet"}
        </p>
        <p className="text-sm text-muted-foreground">
          {filtered ? (
            <>
              Try{" "}
              <Link href="/" className="font-medium text-primary hover:underline">
                all ideas
              </Link>{" "}
              or tweak your filters.
            </>
          ) : (
            "Fresh ideas land daily. Check back soon — something good is brewing."
          )}
        </p>
      </div>
    </div>
  );
}
