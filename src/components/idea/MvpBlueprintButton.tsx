"use client";

import { useState } from "react";
import { Check, FileText } from "lucide-react";
import type { PainPoint } from "@/lib/types";
import { buildMvpBlueprint } from "@/lib/build-mvp-blueprint";
import { Button } from "@/components/ui/button";

interface MvpBlueprintButtonProps {
  painPoint: PainPoint;
}

export function MvpBlueprintButton({ painPoint }: MvpBlueprintButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const blueprint = buildMvpBlueprint(painPoint);

  async function copy() {
    await navigator.clipboard.writeText(blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button className="min-h-11 gap-2" onClick={copy}>
          {copied ? <Check className="size-4" /> : <FileText className="size-4" />}
          {copied ? "Blueprint copied!" : "Copy MVP blueprint"}
        </Button>
        <Button
          variant="outline"
          className="min-h-11"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide preview" : "Preview blueprint"}
        </Button>
      </div>
      {open && (
        <pre className="max-h-80 overflow-x-auto overflow-y-auto rounded-xl border border-border/50 bg-muted/30 p-4 text-xs leading-relaxed break-words whitespace-pre-wrap">
          {blueprint}
        </pre>
      )}
    </div>
  );
}
