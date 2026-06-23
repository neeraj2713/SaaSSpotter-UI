import { Radar } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-base text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-2">
          <Radar className="size-5 text-primary/70" />
          <span>
            <span className="font-semibold text-foreground">SaaSSpotter</span>
            <span className="mx-1.5 text-border">·</span>
            Micro-SaaS ideas from real pain points
          </span>
        </div>
        <p className="text-sm">Scraped from Reddit · Validated by AI</p>
      </div>
    </footer>
  );
}
