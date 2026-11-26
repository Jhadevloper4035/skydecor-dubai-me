export default function sitemap() {
  const paths = [
    "/", "/about-us", "/products", "/contact", "/catalog",
    "/certificates", "/events", "/career", "/FAQs", "/privacy-policy",
    "/term-of-use",
  ];

  return paths.map((path) => ({ url: `https://skydecor.me${path}` }));
}
