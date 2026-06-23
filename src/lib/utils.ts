import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIndustryTag(tag: string): string {
  return tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type DemandScoreVariant = "low" | "medium" | "high";

export function getDemandScoreVariant(score: number): DemandScoreVariant {
  if (score <= 3) return "low";
  if (score <= 6) return "medium";
  return "high";
}

export const COMMON_INDUSTRY_TAGS = [
  "developer-tools",
  "marketing",
  "hr",
  "finance",
  "e-commerce",
] as const;

const TRENDING_DAYS = 7;
const TRENDING_MIN_SCORE = 7;

export function isTrending(painPoint: {
  created_at: string;
  demand_score: number;
}): boolean {
  const created = new Date(painPoint.created_at);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - TRENDING_DAYS);
  return created >= cutoff && painPoint.demand_score >= TRENDING_MIN_SCORE;
}
