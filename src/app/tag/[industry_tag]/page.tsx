import { Suspense } from "react";
import { FeedPage } from "@/components/feed/FeedPage";
import { FeedSkeleton } from "@/components/feed/FeedSkeleton";

interface TagPageProps {
  params: Promise<{ industry_tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { industry_tag } = await params;
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <FeedPage industryTag={industry_tag} />
    </Suspense>
  );
}
