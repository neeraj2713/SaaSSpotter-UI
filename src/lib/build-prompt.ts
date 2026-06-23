import type { PainPoint } from "./types";

export function buildPrompt(painPoint: PainPoint): string {
  const lines = [
    "# Micro-SaaS Build Brief",
    "",
    "## Problem",
    painPoint.core_problem,
    "",
    "## Ideas",
    `1. ${painPoint.saas_idea_1}`,
    `2. ${painPoint.saas_idea_2}`,
    "",
    "## Context",
    `- Target customer: ${painPoint.target_customer ?? "—"}`,
    `- Competition: ${painPoint.competition_level ?? "—"}`,
    `- MVP scope: ${painPoint.mvp_complexity ?? "—"}`,
    `- Monetization: ${painPoint.monetization_hint ?? "—"}`,
    "",
    "## Task",
    "Build an MVP that solves this problem. Start with the simplest version that delivers core value, then iterate based on user feedback.",
  ];
  return lines.join("\n");
}
