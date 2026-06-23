"use client";

import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Bell, Bookmark, Radar, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navLinkClass =
  "hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="hover-bounce flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm sm:size-10">
            <Radar className="size-4 sm:size-[18px]" strokeWidth={2.25} />
          </span>
          <span className="font-heading truncate text-lg font-bold tracking-tight sm:text-xl">
            SaaS<span className="text-primary">Spotter</span>
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link href="/digest" className={navLinkClass}>
            <Sparkles className="size-4 text-play" />
            Digest
          </Link>
          <Show when="signed-in">
            <Link
              href="/saved"
              className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Saved ideas"
            >
              <Bookmark className="size-[18px]" />
            </Link>
            <Link
              href="/alerts"
              className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Alerts"
            >
              <Bell className="size-[18px]" />
            </Link>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Sign in
              </button>
            </SignInButton>
          </Show>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
