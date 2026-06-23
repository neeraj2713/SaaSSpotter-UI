import { Flame } from "lucide-react";

interface ScoreExplainerProps {
  rationale: string[];
  score: number;
}

export function ScoreExplainer({ rationale, score }: ScoreExplainerProps) {
  if (!rationale.length) return null;

  return (
    <section className="rounded-xl border border-border/50 bg-muted/30 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Flame className="size-4 text-orange-500" />
        Why {score}/10 demand?
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {rationale.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
