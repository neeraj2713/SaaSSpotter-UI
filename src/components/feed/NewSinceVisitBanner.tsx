"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getPainPoints, getUserVisit, touchUserVisit } from "@/lib/api";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewSinceVisitBanner() {
  const { isSignedIn } = useAuth();
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);

  const { data: visit } = useQuery({
    queryKey: ["user-visit"],
    queryFn: getUserVisit,
    enabled: isSignedIn,
  });

  const since = visit?.last_visited_at ?? undefined;

  const { data } = useQuery({
    queryKey: ["new-since-visit", since],
    queryFn: () => getPainPoints({ page: 1, page_size: 1, since }),
    enabled: isSignedIn && !!since,
  });

  useEffect(() => {
    if (!isSignedIn) return;
    touchUserVisit();
  }, [isSignedIn]);

  if (!isSignedIn || dismissed || !since || !data?.total) return null;

  const qs = new URLSearchParams(searchParams.toString());
  qs.set("since", since);

  return (
    <div className="surface flex items-start gap-3 p-4">
      <div className="flex-1 text-sm">
        <p className="font-medium">{data.total} new ideas since your last visit</p>
        <Link href={`/?${qs}`} className="text-primary hover:underline">
          View new ideas
        </Link>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
