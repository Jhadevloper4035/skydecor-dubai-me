import ProductListingPage from "@/components/products/ProductListingPage";

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const productType = resolvedSearchParams?.productType || "";
  const category = resolvedSearchParams?.category || "";
  const subCategory = resolvedSearchParams?.subCategory || "";
  const query = resolvedSearchParams?.query || "";
  return (
    <ProductListingPage
      productType={productType}
      category={category}
      subCategory={subCategory}
      query={query}
    />
  );
}
