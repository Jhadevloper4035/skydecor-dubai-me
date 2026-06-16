import ProductListingPage from "@/components/products/ProductListingPage";

export default async function ShopCategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const productType = resolvedSearchParams?.productType || "";
  const category = resolvedParams?.category || "";
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
