import { pageSeoMetadata } from "@/lib/seoMetadata";
import { redirect } from "next/navigation";

export const metadata = pageSeoMetadata("legacyHome");

export default function LegacyComingSoonPage() {
  redirect("/");
}
