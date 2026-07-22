import { seoPages } from "@/data/seoPages";

const SITE_NAME = "Skydecor Dubai";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://skydecor.me").replace(/\/$/, "");
const DEFAULT_IMAGE = "/images/logo/logo.png";
const DEFAULT_DESCRIPTION =
  "Explore Skydecor Dubai decorative surfaces, HPL, panels, catalogues, certificates, and project support across the UAE.";

const list = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean);

export const readableText = (value = "") =>
  String(value || "")
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bHpl\b/g, "HPL")
    .replace(/\bPvc\b/g, "PVC")
    .replace(/\bMdf\b/g, "MDF")
    .replace(/\bUae\b/g, "UAE");

export const siteUrl = (path = "/") => {
  const text = String(path || "/").trim();
  if (/^https?:\/\//i.test(text)) return text;

  const cleanPath = text.startsWith("/") ? text : `/${text}`;
  return `${SITE_URL}${cleanPath}`;
};

export const pageMetadata = ({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
}) => {
  const cleanTitle = String(title || SITE_NAME).trim();
  const fullTitle = cleanTitle.includes(SITE_NAME) ? cleanTitle : `${cleanTitle} | ${SITE_NAME}`;
  const url = siteUrl(path);
  const imageUrl = siteUrl(image || DEFAULT_IMAGE);

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: imageUrl, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
};

export const pageSeoMetadata = (key, overrides = {}) =>
  pageMetadata({ ...(seoPages[key] || {}), ...overrides });

export const productListingSeo = ({
  productType = "",
  category = "",
  subCategory = "",
  query = "",
  path = "/products",
} = {}) => {
  const filters = [productType, category, subCategory].map(readableText).filter(Boolean);
  const searchText = readableText(query);
  const title = searchText
    ? `Search ${searchText}`
    : filters.length
      ? `${filters.join(" ")} Products`
      : seoPages.products.title;
  const productText = filters.length ? filters.join(", ") : "decorative HPL and surface";

  return {
    title,
    path,
    description: filters.length || searchText
      ? `Browse ${productText} products from Skydecor Dubai with images, specifications, and catalogue PDF details.`
      : seoPages.products.description,
  };
};

export const productListingMetadata = (options = {}) => {
  const seo = productListingSeo(options);

  return pageMetadata({
    title: seo.title,
    path: seo.path,
    description: seo.description,
  });
};

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: siteUrl(DEFAULT_IMAGE),
  sameAs: [
    "https://www.facebook.com/Skydecormiddleeast",
    "https://www.instagram.com/skydecor.me/?hl=en",
    "https://www.youtube.com/@skydecorindia",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971582093821",
    contactType: "customer support",
    areaServed: "AE",
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/products?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const webPageSchema = ({ title, description, path = "/" }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: siteUrl(path),
});

export const collectionPageSchema = ({ title, description, path = "/products" }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: siteUrl(path),
});

export const productSchema = (product = {}, path = "/products") => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: readableText(product.productName || product.title || product.designName || product.productCode),
  sku: String(product.productCode || product.productCodeSlug || "").toUpperCase(),
  image: list(product.images || product.image || product.imgSrc).map(siteUrl),
  description: `Skydecor ${readableText(product.productType)} ${readableText(product.category)} product with specifications and catalogue details.`,
  category: [product.productType, product.category, product.subCategory].map(readableText).filter(Boolean).join(" / "),
  url: siteUrl(path),
  brand: {
    "@type": "Brand",
    name: "Skydecor",
  },
});

export const articleSchema = (article = {}, path = "/blog-default") => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.excerpt || article.description,
  image: siteUrl(article.coverImage || article.imgSrc || "/images/blog/blog-grid-1.jpg"),
  url: siteUrl(path),
  author: {
    "@type": "Organization",
    name: SITE_NAME,
  },
  publisher: organizationSchema(),
  datePublished: article.publishedAt || article.date || article.createdAt,
});

export const eventSchema = (event = {}, path = "/events") => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.title,
  description: event.excerpt,
  image: siteUrl(event.coverImage || "/images/our-project-image-1.jpg"),
  url: siteUrl(path),
  startDate: event.startDate || event.date,
  location: {
    "@type": "Place",
    name: event.location || "Dubai, UAE",
  },
  organizer: organizationSchema(),
});

export const jobPostingSchema = (job = {}, path = "/career") => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description || job.summary,
  employmentType: String(job.employmentType || "full-time").toUpperCase().replace(/-/g, "_"),
  hiringOrganization: organizationSchema(),
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location || "Dubai",
      addressCountry: "AE",
    },
  },
  url: siteUrl(path),
});
