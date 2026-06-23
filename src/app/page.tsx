import { Suspense } from "react";
import { FeedPage } from "@/components/feed/FeedPage";
import { FeedSkeleton } from "@/components/feed/FeedSkeleton";

export default function Home() {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <FeedPage />
    </Suspense>
  );
}
