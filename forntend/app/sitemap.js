import { getBlogsFromApi, getEventsFromApi, localBlogs, localEvents } from "@/lib/contentApi";
import { getJobs } from "@/lib/careersApi";
import {
  getProductDetailHref,
  getProductsFromApi,
  localProducts,
} from "@/lib/productsApi";
import { siteUrl } from "@/lib/seoMetadata";

const staticRoutes = [
  "/",
  "/about-us",
  "/products",
  "/blog-default",
  "/contact",
  "/FAQs",
  "/term-of-use",
  "/catalog",
  "/certificates",
  "/career",
  "/events",
];

const sitemapEntry = (path, priority = 0.7) => ({
  url: siteUrl(path),
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority,
});

const unique = (items) => [...new Set(items.filter(Boolean))];
const slugify = (value = "") => String(value).trim().toLowerCase().replace(/\s+/g, "-");

const productListingRoutes = (products = []) => {
  const routes = products.flatMap((product) => {
    const productType = slugify(product.productTypeSlug || product.productType);
    const category = slugify(product.categorySlug || product.category);
    const subCategory = slugify(product.subCategorySlug || product.subCategory);

    return [
      productType && `/products/product-type/${productType}`,
      productType && category && `/products/product-type/${productType}/category/${category}`,
      productType &&
        category &&
        subCategory &&
        `/products/product-type/${productType}/category/${category}/sub-category/${subCategory}`,
    ];
  });

  return unique(routes);
};

export default async function sitemap() {
  const products = (await getProductsFromApi({ limit: 1000, isActive: true })) || localProducts;
  const blogs = (await getBlogsFromApi()) || localBlogs;
  const events = (await getEventsFromApi()) || localEvents;
  const jobs = await getJobs();

  return [
    ...staticRoutes.map((path) => sitemapEntry(path, path === "/" ? 1 : 0.8)),
    ...productListingRoutes(products).map((path) => sitemapEntry(path, 0.75)),
    ...products.map((product) => sitemapEntry(getProductDetailHref(product), 0.85)),
    ...blogs.map((blog) => sitemapEntry(`/blog-detail/${blog.slug || blog.id}`, 0.7)),
    ...events.map((event) => sitemapEntry(`/events/${event.slug || event.id}`, 0.7)),
    ...jobs.map((job) => sitemapEntry(`/career/${job.slug || job.id}`, 0.6)),
  ];
}
