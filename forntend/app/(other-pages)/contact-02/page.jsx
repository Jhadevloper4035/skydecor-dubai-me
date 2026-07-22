import { pageSeoMetadata } from "@/lib/seoMetadata";
import { redirect } from "next/navigation";

export const metadata = pageSeoMetadata("legacyContact");

export default function LegacyContactPage() {
  redirect("/contact");
}
