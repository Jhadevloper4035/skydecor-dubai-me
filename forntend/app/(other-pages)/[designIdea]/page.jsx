import { notFound } from "next/navigation";

import DesignIdeaPage from "@/components/otherPages/DesignIdeaPage";
import { designIdeas, getDesignIdea } from "@/data/designIdeas";

export function generateStaticParams() {
  return designIdeas.map(({ slug }) => ({ designIdea: slug }));
}

export async function generateMetadata({ params }) {
  const { designIdea: slug } = await params;
  const idea = getDesignIdea(slug);

  if (!idea) {
    return {};
  }

  return {
    title: `${idea.title} | skydecor Dubai`,
    description: idea.intro,
  };
}

export default async function DesignIdeaRoute({ params }) {
  const { designIdea: slug } = await params;
  const idea = getDesignIdea(slug);

  if (!idea) {
    notFound();
  }

  return <DesignIdeaPage idea={idea} />;
}
