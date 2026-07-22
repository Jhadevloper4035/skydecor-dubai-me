import SeoJsonLd from "@/components/common/SeoJsonLd";
import ProductListingPage from "@/components/products/ProductListingPage";
import {
  collectionPageSchema,
  productListingMetadata,
  productListingSeo,
} from "@/lib/seoMetadata";

const getSeoOptions = (params = {}, searchParams = {}) => ({
  productType: searchParams?.productType || "",
  category: params?.category || "",
  subCategory: searchParams?.subCategory || "",
  query: searchParams?.query || "",
  path: `/products/${params?.category || ""}`,
});

export async function generateMetadata({ params, searchParams }) {
  return productListingMetadata(getSeoOptions(await params, await searchParams));
}

export default async function ShopCategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const seo = productListingSeo(getSeoOptions(resolvedParams, resolvedSearchParams));

  return (
    <>
      <SeoJsonLd data={collectionPageSchema(seo)} />
      <ProductListingPage
        productType={resolvedSearchParams?.productType || ""}
        category={resolvedParams?.category || ""}
        subCategory={resolvedSearchParams?.subCategory || ""}
        query={resolvedSearchParams?.query || ""}
      />
    </>
  );
}
