"use client";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { getSavedIds, saveIdea, unsaveIdea } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaveIdeaButtonProps {
  painPointId: string;
  className?: string;
  iconOnly?: boolean;
}

export function SaveIdeaButton({
  painPointId,
  className,
  iconOnly = false,
}: SaveIdeaButtonProps) {
  const { isSignedIn } = useAuth();
  const queryClient = useQueryClient();

  const { data: savedIds = [] } = useQuery({
    queryKey: ["saved-ids"],
    queryFn: getSavedIds,
    enabled: isSignedIn,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const isSaved = savedIds.includes(painPointId);
      if (isSaved) await unsaveIdea(painPointId);
      else await saveIdea(painPointId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["saved-ids"] }),
  });

  const isSaved = savedIds.includes(painPointId);

  if (iconOnly) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "size-9 shrink-0",
          isSaved && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
          className,
        )}
        disabled={mutation.isPending}
        aria-label={isSaved ? "Unsave idea" : "Save idea"}
        aria-pressed={isSaved}
        onClick={() => {
          if (!isSignedIn) {
            window.location.href = "/sign-in";
            return;
          }
          mutation.mutate();
        }}
      >
        <Bookmark className={cn("size-4", isSaved && "fill-current")} />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("min-h-11 gap-2", className)}
      disabled={mutation.isPending}
      onClick={() => {
        if (!isSignedIn) {
          window.location.href = "/sign-in";
          return;
        }
        mutation.mutate();
      }}
    >
      <Bookmark className={cn("size-4", isSaved && "fill-current")} />
      {isSaved ? "Saved" : "Save"}
    </Button>
  );
}
