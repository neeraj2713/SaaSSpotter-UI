import { Skeleton } from "@/components/ui/skeleton";

export function IdeaDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-3 py-6 sm:px-6 sm:py-12">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-12 w-full max-w-2xl" />
      <Skeleton className="h-24 w-full" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}
