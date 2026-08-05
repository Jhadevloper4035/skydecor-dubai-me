import ProductDetailStoreView from "@/components/productDetails/ProductDetailStoreView";
import SeoJsonLd from "@/components/common/SeoJsonLd";
import { findFallbackProduct, getProductFromApi } from "@/lib/productsApi";
import { pageMetadata, productSchema, readableText } from "@/lib/seoMetadata";
import { notFound } from "next/navigation";

const cleanText = (value = "") => String(value || "").trim();

const normalText = (value = "") =>
  cleanText(value).toLowerCase().replace(/[^a-z0-9]/g, "");

const getProductForPage = async (id) =>
  (await getProductFromApi(id)) || findFallbackProduct(id);

const getProductCode = (product = {}, id = "") =>
  cleanText(product.productCodeSlug || product.productCode || id).toLowerCase();

const getPath = ({ productType, category, id }) =>
  `/products/product-type/${productType}/category/${category}/${id}`;

export async function generateMetadata({ params }) {
  const { productType, category, id } = await params;
  const product = await getProductForPage(id);

  if (!product) {
    return pageMetadata({
      title: "Product Not Found | Skydecor Dubai",
      description: "The requested Skydecor Dubai product could not be found.",
      path: getPath({ productType, category, id }),
      noIndex: true,
    });
  }

  const productCode = getProductCode(product, id);
  const productName = readableText(
    product.productName || product.title || product.designName
  );
  const titleName = normalText(productCode).includes(normalText(productName))
    ? ""
    : productName;
  const productDetails = [
    product.productType,
    product.category,
    product.subCategory,
    product.texture,
  ]
    .map(readableText)
    .filter(Boolean)
    .join(", ");

  return pageMetadata({
    title: `${productCode}${titleName ? ` - ${titleName}` : ""}`,
    path: getPath({ productType, category, id }),
    image: product.imgSrc || product.images?.[0] || product.image?.[0],
    description: `View ${productCode}${productDetails ? ` ${productDetails}` : ""} product details, specifications, and catalogue PDF from Skydecor Dubai.`,
  });
}

export default async function ProductDetailPage({ params }) {
  const { productType, category, id } = await params;
  const product = await getProductForPage(id);
  if (!product) notFound();

  return (
    <>
      <SeoJsonLd data={productSchema(product, getPath({ productType, category, id }))} />
      <ProductDetailStoreView id={id} initialProduct={product} />
    </>
  );
}
