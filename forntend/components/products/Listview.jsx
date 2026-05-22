import React from "react";
import ProductsCards6 from "../productCards/ProductsCards6";
import Pagination from "../common/Pagination";

export default function Listview({
  products,
  pagination = true,
  currentPage = 1,
  totalPages = 1,
  setCurrentPage = () => {},
}) {
  return (
    <>
      {/* card product list 1 */}
      {products.map((product, i) => (
        <ProductsCards6
          product={product}
          key={`${product._id || product.productCodeSlug || product.productCode || product.id}-${i}`}
        />
      ))}
      {/* pagination */}
      {pagination && totalPages > 1 ? (
        <ul className="wg-pagination ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
