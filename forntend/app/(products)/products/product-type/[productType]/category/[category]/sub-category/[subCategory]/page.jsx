import ProductListingPage from "@/components/products/ProductListingPage";

export default async function ProductTypeSubCategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <ProductListingPage
      productType={resolvedParams?.productType || ""}
      category={resolvedParams?.category || ""}
      subCategory={resolvedParams?.subCategory || ""}
      query={resolvedSearchParams?.query || ""}
    />
  );
}
