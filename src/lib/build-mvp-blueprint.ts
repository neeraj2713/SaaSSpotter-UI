import type { PainPoint } from "./types";
import { buildPrompt } from "./build-prompt";

const COMPLEXITY_WEEKS: Record<string, string> = {
  weekend: "Days 1-2: core flow. Days 3-4: polish and deploy.",
  month: "Week 1: core MVP. Weeks 2-3: feedback and iteration. Week 4: launch prep.",
  quarter: "Month 1: MVP. Month 2: beta users. Month 3: monetization and scale.",
};

export function buildMvpBlueprint(painPoint: PainPoint): string {
  const base = buildPrompt(painPoint);
  const complexity = painPoint.mvp_complexity ?? "month";
  const weekPlan = COMPLEXITY_WEEKS[complexity] ?? COMPLEXITY_WEEKS.month;

  return `${base}

## MVP Blueprint

### Core user flow
1. User discovers the problem context and signs up
2. User completes the primary action that solves "${painPoint.core_problem.slice(0, 80)}"
3. User gets a clear outcome / export / notification

### Must-have features (v1)
- Single landing page with value prop for ${painPoint.target_customer ?? "target users"}
- Core workflow for: ${painPoint.saas_idea_1.slice(0, 100)}
- Basic auth and one export or share action

### Nice-to-have (v2)
- Second idea angle: ${painPoint.saas_idea_2.slice(0, 100)}
- Team collaboration, integrations, analytics dashboard

### Week 1 plan
${weekPlan}

### Suggested stack
- Next.js + Tailwind (frontend)
- FastAPI or Next.js API routes (backend)
- MongoDB or Postgres (data)
- Stripe for ${painPoint.monetization_hint ?? "subscription billing"}
`;
}
