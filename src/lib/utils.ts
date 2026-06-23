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
