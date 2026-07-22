import SeoJsonLd from "@/components/common/SeoJsonLd";
import ProductListingPage from "@/components/products/ProductListingPage";
import {
  collectionPageSchema,
  productListingMetadata,
  productListingSeo,
} from "@/lib/seoMetadata";

const getSeoOptions = (searchParams = {}) => ({
  productType: searchParams?.productType || "",
  category: searchParams?.category || "",
  subCategory: searchParams?.subCategory || "",
  query: searchParams?.query || "",
  path: "/products",
});

export async function generateMetadata({ searchParams }) {
  return productListingMetadata(getSeoOptions(await searchParams));
}

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const seo = productListingSeo(getSeoOptions(resolvedSearchParams));

  return (
    <>
      <SeoJsonLd data={collectionPageSchema(seo)} />
      <ProductListingPage
        productType={resolvedSearchParams?.productType || ""}
        category={resolvedSearchParams?.category || ""}
        subCategory={resolvedSearchParams?.subCategory || ""}
        query={resolvedSearchParams?.query || ""}
      />
    </>
  );
}
