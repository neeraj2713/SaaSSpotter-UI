import { Megaphone } from "lucide-react";

export function EngagementSignal({ signal }: { signal: string }) {
  if (!signal) return null;

  return (
    <div className="flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
      <Megaphone className="mt-0.5 size-4 shrink-0" />
      <span>{signal}</span>
    </div>
  );
}
