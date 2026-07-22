import { pageSeoMetadata } from "@/lib/seoMetadata";
import { redirect } from "next/navigation";

export const metadata = pageSeoMetadata("legacyBlog");

export default function LegacyBlogGridPage() {
  redirect("/blog-default");
}
