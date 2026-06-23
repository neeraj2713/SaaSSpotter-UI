import Link from "next/link";
import { Radar } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl"
            className="flex size-11 items-center justify-center bg-background p-0"
          >
            <Radar className="size-6 text-primary" strokeWidth={2.25} />
          </HoverBorderGradient>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              <span className="text-gradient-brand">SaaS</span>
              <span className="text-foreground">Spotter</span>
            </span>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Turn complaints into companies
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
