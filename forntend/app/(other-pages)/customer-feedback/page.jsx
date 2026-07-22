import { pageSeoMetadata } from "@/lib/seoMetadata";
import { redirect } from "next/navigation";

export const metadata = pageSeoMetadata("legacyAbout");

export default function LegacyFeedbackPage() {
  redirect("/about-us");
}
