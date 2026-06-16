import { redirect } from "next/navigation";

export default async function LegacyBlogDetailPage({ params }) {
  const { id } = await params;
  redirect(`/blog-detail/${id}`);
}
