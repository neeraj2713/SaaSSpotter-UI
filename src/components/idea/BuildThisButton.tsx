"use client";

import { useState } from "react";
import { Check, Hammer } from "lucide-react";
import type { PainPoint } from "@/lib/types";
import { buildPrompt } from "@/lib/build-prompt";
import { Button } from "@/components/ui/button";

interface BuildThisButtonProps {
  painPoint: PainPoint;
}

export function BuildThisButton({ painPoint }: BuildThisButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(buildPrompt(painPoint));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button className="min-h-11 gap-2" onClick={copyPrompt}>
      {copied ? <Check className="size-4" /> : <Hammer className="size-4" />}
      {copied ? "Prompt copied!" : "Copy build prompt"}
    </Button>
  );
}
