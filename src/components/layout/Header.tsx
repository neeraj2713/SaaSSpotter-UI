import Link from "next/link";
import { Radar } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl shrink-0"
            className="flex size-9 items-center justify-center bg-background p-0 sm:size-11"
          >
            <Radar className="size-5 text-primary sm:size-6" strokeWidth={2.25} />
          </HoverBorderGradient>
          <div className="flex min-w-0 flex-col">
            <span className="font-heading truncate text-xl font-extrabold tracking-tight sm:text-3xl">
              <span className="text-gradient-brand">SaaS</span>
              <span className="text-foreground">Spotter</span>
            </span>
            <span className="truncate text-xs text-muted-foreground sm:text-sm">
              Turn complaints into companies
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
