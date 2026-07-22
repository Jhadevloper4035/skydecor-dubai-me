import SeoJsonLd from "@/components/common/SeoJsonLd";
import ProductListingPage from "@/components/products/ProductListingPage";
import {
  collectionPageSchema,
  productListingMetadata,
  productListingSeo,
} from "@/lib/seoMetadata";

const getSeoOptions = (params = {}, searchParams = {}) => ({
  productType: params?.productType || "",
  category: searchParams?.category || "",
  subCategory: searchParams?.subCategory || "",
  query: searchParams?.query || "",
  path: `/products/product-type/${params?.productType || ""}`,
});

export async function generateMetadata({ params, searchParams }) {
  return productListingMetadata(getSeoOptions(await params, await searchParams));
}

export default async function ShopProductTypePage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const seo = productListingSeo(getSeoOptions(resolvedParams, resolvedSearchParams));

  return (
    <>
      <SeoJsonLd data={collectionPageSchema(seo)} />
      <ProductListingPage
        productType={resolvedParams?.productType || ""}
        category={resolvedSearchParams?.category || ""}
        subCategory={resolvedSearchParams?.subCategory || ""}
        query={resolvedSearchParams?.query || ""}
      />
    </>
  );
}
