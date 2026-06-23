"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import type { PainPoint } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  painPoint: PainPoint;
}

export function ShareButtons({ painPoint }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function tweetUrl() {
    const text = `Micro-SaaS idea: ${painPoint.core_problem} — ${painPoint.saas_idea_1}`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  }

  async function nativeShare() {
    if (!navigator.share) return;
    await navigator.share({
      title: painPoint.core_problem,
      text: `Micro-SaaS idea: ${painPoint.saas_idea_1}`,
      url: window.location.href,
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="min-h-11"
        onClick={copyLink}
      >
        {copied ? (
          <Check className="size-4" />
        ) : (
          <Copy className="size-4" />
        )}
        {copied ? "Copied!" : "Copy link"}
      </Button>

      <a
        href={tweetUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "min-h-11")}
      >
        Share on X
      </a>

      {typeof navigator !== "undefined" && "share" in navigator && (
        <Button
          variant="outline"
          size="sm"
          className="min-h-11"
          onClick={nativeShare}
        >
          <Share2 className="size-4" />
          Share
        </Button>
      )}
    </div>
  );
}
