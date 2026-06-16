import ProductListingPage from "@/components/products/ProductListingPage";

export default async function ProductTypeCategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <ProductListingPage
      productType={resolvedParams?.productType || ""}
      category={resolvedParams?.category || ""}
      subCategory={resolvedSearchParams?.subCategory || ""}
      query={resolvedSearchParams?.query || ""}
    />
  );
}
