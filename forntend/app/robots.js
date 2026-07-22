import { siteUrl } from "@/lib/seoMetadata";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/404",
        "/thank-you",
        "/compare-products",
        "/coming-soon",
        "/contact-02",
        "/store-list",
        "/store-list-02",
        "/customer-feedback",
        "/shop-collection",
      ],
    },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
