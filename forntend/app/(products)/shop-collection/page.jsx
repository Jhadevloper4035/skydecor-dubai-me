import { pageSeoMetadata } from "@/lib/seoMetadata";
import { redirect } from "next/navigation";

export const metadata = pageSeoMetadata("legacyProducts");

export default function LegacyCollectionPage() {
  redirect("/products");
}
