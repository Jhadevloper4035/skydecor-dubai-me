import ProductListingPage from "@/components/products/ProductListingPage";

export default async function ShopSubCategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <ProductListingPage
      productType={resolvedSearchParams?.productType || ""}
      category={resolvedParams?.category || ""}
      subCategory={resolvedParams?.subCategory || ""}
      query={resolvedSearchParams?.query || ""}
    />
  );
}
