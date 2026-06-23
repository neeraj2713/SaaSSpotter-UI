import { Radar } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:px-6 sm:py-8 sm:text-left sm:text-base">
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
          <div className="flex items-center gap-2">
            <Radar className="size-4 shrink-0 text-primary/70 sm:size-5" />
            <span className="font-semibold text-foreground">SaaSSpotter</span>
          </div>
          <span className="hidden text-border sm:inline">·</span>
          <span className="max-w-xs sm:max-w-none">
            Micro-SaaS ideas from real pain points
          </span>
        </div>
        <p className="text-xs sm:text-sm">Scraped from Reddit · Validated by AI</p>
      </div>
    </footer>
  );
}
