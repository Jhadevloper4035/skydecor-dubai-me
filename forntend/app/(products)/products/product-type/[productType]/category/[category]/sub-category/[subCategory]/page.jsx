import SeoJsonLd from "@/components/common/SeoJsonLd";
import ProductListingPage from "@/components/products/ProductListingPage";
import {
  collectionPageSchema,
  productListingMetadata,
  productListingSeo,
} from "@/lib/seoMetadata";

const getSeoOptions = (params = {}, searchParams = {}) => ({
  productType: params?.productType || "",
  category: params?.category || "",
  subCategory: params?.subCategory || "",
  query: searchParams?.query || "",
  path: `/products/product-type/${params?.productType || ""}/category/${params?.category || ""}/sub-category/${params?.subCategory || ""}`,
});

export async function generateMetadata({ params, searchParams }) {
  return productListingMetadata(getSeoOptions(await params, await searchParams));
}

export default async function ProductTypeSubCategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const seo = productListingSeo(getSeoOptions(resolvedParams, resolvedSearchParams));

  return (
    <>
      <SeoJsonLd data={collectionPageSchema(seo)} />
      <ProductListingPage
        productType={resolvedParams?.productType || ""}
        category={resolvedParams?.category || ""}
        subCategory={resolvedParams?.subCategory || ""}
        query={resolvedSearchParams?.query || ""}
      />
    </>
  );
}
