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
    <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
      <p className="text-center text-sm text-muted-foreground sm:text-left sm:text-base">
        Page{" "}
        <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
        <span className="hidden sm:inline">
          <span className="mx-2 text-border">·</span>
          <span className="font-medium text-foreground">{total}</span> ideas total
        </span>
      </p>

      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
        {isLoading && (
          <Loader2 className="col-span-2 mx-auto size-4 animate-spin text-primary sm:col-span-1 sm:mx-0" />
        )}
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPrev || isLoading}
          onClick={() => onPageChange(page - 1)}
          className="min-h-11 border-border/60 bg-card/60 hover:bg-primary/10 hover:text-primary sm:min-h-8"
        >
          <ChevronLeft className="size-4" />
          <span className="sm:hidden">Prev</span>
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNext || isLoading}
          onClick={() => onPageChange(page + 1)}
          className="min-h-11 border-border/60 bg-card/60 hover:bg-primary/10 hover:text-primary sm:min-h-8"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
