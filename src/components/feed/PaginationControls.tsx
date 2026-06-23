"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  page,
  pageSize,
  total,
  hasNext,
  isLoading = false,
  onPageChange,
}: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasPrev = page > 1;

  if (total === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4 pt-8 sm:flex-row sm:justify-between">
      <p className="text-base text-muted-foreground">
        Showing page{" "}
        <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
        <span className="mx-2 text-border">·</span>
        <span className="font-medium text-foreground">{total}</span> ideas total
      </p>

      <div className="flex items-center gap-2">
        {isLoading && (
          <Loader2 className="size-4 animate-spin text-primary" />
        )}
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPrev || isLoading}
          onClick={() => onPageChange(page - 1)}
          className="border-border/60 bg-card/60 hover:bg-primary/10 hover:text-primary"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNext || isLoading}
          onClick={() => onPageChange(page + 1)}
          className="border-border/60 bg-card/60 hover:bg-primary/10 hover:text-primary"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
