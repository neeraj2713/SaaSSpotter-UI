import { Quote } from "lucide-react";
import type { PainPointDetail } from "@/lib/types";

interface EvidencePanelProps {
  painPoint: PainPointDetail;
}

export function EvidencePanel({ painPoint }: EvidencePanelProps) {
  const quotes = painPoint.evidence_quotes ?? [];
  if (quotes.length === 0 && !painPoint.source_excerpt) return null;

  return (
    <section className="min-w-0 space-y-3 rounded-2xl border border-border/50 bg-card/80 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
        <div className="flex items-center gap-2">
          <Quote className="size-4 text-primary" />
          Evidence from source
        </div>
        {painPoint.source_subreddit && (
          <span className="text-muted-foreground">· r/{painPoint.source_subreddit}</span>
        )}
      </div>
      {quotes.length > 0 ? (
        <ul className="space-y-3">
          {quotes.map((quote, i) => (
            <li
              key={i}
              className="break-words border-l-2 border-primary/40 pl-4 text-sm italic leading-relaxed text-foreground/90"
            >
              &ldquo;{quote}&rdquo;
            </li>
          ))}
        </ul>
      ) : (
        <p className="break-words text-sm leading-relaxed text-muted-foreground">
          {painPoint.source_excerpt}
        </p>
      )}
    </section>
  );
}
