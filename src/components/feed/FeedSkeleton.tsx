import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

function PainPointCardSkeleton() {
  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
        <div className="space-y-3 rounded-lg border border-border/50 bg-muted/20 p-4">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-border/40 bg-muted/20">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
      </CardFooter>
    </Card>
  );
}

export function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PainPointCardSkeleton key={i} />
      ))}
    </div>
  );
}
