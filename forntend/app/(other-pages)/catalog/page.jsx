import { pageSeoMetadata } from "@/lib/seoMetadata";
import { redirect } from "next/navigation";

export const metadata = pageSeoMetadata("legacyCatalog");

export default function CatalogRoute() {
  redirect("/e-catalogues");
}
