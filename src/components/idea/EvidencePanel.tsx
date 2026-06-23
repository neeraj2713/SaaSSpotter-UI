import { Quote } from "lucide-react";
import type { PainPointDetail } from "@/lib/types";

interface EvidencePanelProps {
  painPoint: PainPointDetail;
}

export function EvidencePanel({ painPoint }: EvidencePanelProps) {
  const quotes = painPoint.evidence_quotes ?? [];
  if (quotes.length === 0 && !painPoint.source_excerpt) return null;

  return (
    <section className="space-y-3 rounded-2xl border border-border/50 bg-card/80 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Quote className="size-4 text-primary" />
        Evidence from source
        {painPoint.source_subreddit && (
          <span className="text-muted-foreground">· r/{painPoint.source_subreddit}</span>
        )}
      </div>
      {quotes.length > 0 ? (
        <ul className="space-y-3">
          {quotes.map((quote, i) => (
            <li
              key={i}
              className="border-l-2 border-primary/40 pl-4 text-sm italic leading-relaxed text-foreground/90"
            >
              &ldquo;{quote}&rdquo;
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {painPoint.source_excerpt}
        </p>
      )}
    </section>
  );
}
