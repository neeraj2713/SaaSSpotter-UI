export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-left sm:text-sm">
        <p>
          <span className="font-heading font-semibold text-foreground">SaaSSpotter</span>
          <span className="mx-2 hidden text-border sm:inline">·</span>
          <span className="block sm:inline">Ideas from real complaints</span>
        </p>
        <p>Reddit → AI → your next build</p>
      </div>
    </footer>
  );
}
