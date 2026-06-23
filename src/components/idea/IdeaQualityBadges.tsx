import { Badge } from "@/components/ui/badge";
import type { PainPoint } from "@/lib/types";
import { cn, formatIndustryTag } from "@/lib/utils";
import { Clock, DollarSign, Target, Users } from "lucide-react";

interface IdeaQualityBadgesProps {
  painPoint: PainPoint;
  variant?: "compact" | "expanded";
  className?: string;
}

const competitionColors = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  high: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
} as const;

const complexityLabels = {
  weekend: "Weekend MVP",
  month: "Month MVP",
  quarter: "Quarter MVP",
} as const;

export function IdeaQualityBadges({
  painPoint,
  variant = "compact",
  className,
}: IdeaQualityBadgesProps) {
  const hasQuality =
    painPoint.target_customer ||
    painPoint.competition_level ||
    painPoint.mvp_complexity ||
    painPoint.monetization_hint;

  if (!hasQuality) return null;

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-1.5", className)}>
        {painPoint.competition_level && (
          <Badge
            variant="outline"
            className={cn("text-xs", competitionColors[painPoint.competition_level])}
          >
            {painPoint.competition_level} competition
          </Badge>
        )}
        {painPoint.mvp_complexity && (
          <Badge variant="outline" className="text-xs">
            {complexityLabels[painPoint.mvp_complexity]}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "surface grid gap-3 p-4 sm:grid-cols-2",
        className,
      )}
    >
      <QualityItem
        icon={Users}
        label="Target customer"
        value={painPoint.target_customer}
      />
      <QualityItem
        icon={Target}
        label="Competition"
        value={
          painPoint.competition_level
            ? `${formatIndustryTag(painPoint.competition_level)} competition`
            : null
        }
      />
      <QualityItem
        icon={Clock}
        label="MVP scope"
        value={
          painPoint.mvp_complexity
            ? complexityLabels[painPoint.mvp_complexity]
            : null
        }
      />
      <QualityItem
        icon={DollarSign}
        label="Monetization"
        value={painPoint.monetization_hint}
      />
    </div>
  );
}

function QualityItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <p className="text-sm text-foreground">{value ?? "—"}</p>
    </div>
  );
}
