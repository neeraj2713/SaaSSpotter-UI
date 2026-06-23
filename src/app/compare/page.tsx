import { Suspense } from "react";
import { ComparePage } from "@/components/compare/ComparePage";

export default function CompareRoute() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading comparison…</div>}>
      <ComparePage />
    </Suspense>
  );
}
