import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function PainPointCardSkeleton() {
  return (
    <Card className="flex h-full flex-col rounded-2xl border-border/50 shadow-sm">
      <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="justify-between border-t border-border/40 px-4 py-2.5">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </CardFooter>
    </Card>
  );
}

export function FeedSkeleton() {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PainPointCardSkeleton key={i} />
      ))}
    </div>
  );
}
