/** @type {import('next').NextConfig} */
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:8000/api/v1";

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  output: "standalone",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/shop-default-grid/:path*",
        destination: "/products/:path*",
        permanent: true,
      },
      {
        source: "/shop-default-grid",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/contact-02",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/store-list/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/store-list-02/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/customer-feedback",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/coming-soon",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog-grid",
        destination: "/blog-default",
        permanent: true,
      },
      {
        source: "/blog-list",
        destination: "/blog-default",
        permanent: true,
      },
      {
        source: "/blog-detail-02/:path*",
        destination: "/blog-detail/:path*",
        permanent: true,
      },
      {
        source: "/shop-collection",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/catalogue",
        destination: "/e-catalogues",
        permanent: true,
      },
      {
        source: "/catalouge",
        destination: "/e-catalogues",
        permanent: true,
      },
    ];
  },
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
