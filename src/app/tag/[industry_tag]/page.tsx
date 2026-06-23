import { FeedPage } from "@/components/feed/FeedPage";

interface TagPageProps {
  params: Promise<{ industry_tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { industry_tag } = await params;
  return <FeedPage industryTag={industry_tag} />;
}
