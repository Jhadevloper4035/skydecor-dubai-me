import { pageSeoMetadata } from "@/lib/seoMetadata";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;

  return pageSeoMetadata("legacyBlog", {
    path: `/blog-detail/${id}`,
  });
}

export default async function LegacyBlogDetailPage({ params }) {
  const { id } = await params;
  redirect(`/blog-detail/${id}`);
}
