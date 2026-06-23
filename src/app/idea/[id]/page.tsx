import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPainPointById } from "@/lib/api";
import { IdeaDetailPage } from "@/components/idea/IdeaDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const painPoint = await getPainPointById(id);
    const title =
      painPoint.core_problem.length > 60
        ? `${painPoint.core_problem.slice(0, 57)}…`
        : painPoint.core_problem;

    return {
      title: `${title} | SaaSSpotter`,
      description: painPoint.saas_idea_1,
      openGraph: {
        title,
        description: painPoint.saas_idea_1,
        type: "article",
      },
    };
  } catch {
    return { title: "Idea not found | SaaSSpotter" };
  }
}

export default async function IdeaPage({ params }: PageProps) {
  const { id } = await params;

  let painPoint;
  try {
    painPoint = await getPainPointById(id);
  } catch {
    notFound();
  }

  return <IdeaDetailPage painPoint={painPoint} />;
}
