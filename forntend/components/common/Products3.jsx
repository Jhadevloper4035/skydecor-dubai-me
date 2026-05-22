"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import productsData from "@/data/products.json";
import React, { useState } from "react";
import Link from "next/link";

const tabs = [
  { label: "1mm Laminates", thickness: "1 mm +" },
  { label: "0.8mm Laminates", thickness: "0.8 mm" },
];

export default function Products3({ parentClass = "flat-spacing-3" }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const filteredProducts = productsData
    .filter((p) => p.thickness === activeTab.thickness)
    .slice(0, 8);

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Our Products</h3>
          <p className="subheading text-secondary">
            Explore our premium laminate collection
          </p>
        </div>
        <div className="flat-animate-tab">
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.thickness} className="nav-tab-item">
                <a
                  href="#"
                  className={activeTab.thickness === tab.thickness ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="wow fadeInUp"
                    data-wow-delay={`${index * 0.1}s`}
                  >
                    <ProductCard1 product={product} />
                  </div>
                ))}
              </div>
              <div className="sec-btn text-center">
                <Link href="/shop-default-grid" className="btn-line">
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
