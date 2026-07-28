import React from "react";

export default function FilterMeta({
  allProps,
  productLength,
  visibleStart = 0,
  visibleEnd = 0,
}) {
  const appliedFilters = [
    ["productType", "setProductType"],
    ["category", "setCategory"],
    ["subCategory", "setSubCategory"],
    ["texture", "setTexture"],
    ["size", "setSize"],
    ["thickness", "setThickness"],
  ].filter(([filterKey]) => allProps[filterKey] != "All");

  return (
    <div className="meta-filter-shop" style={{}}>
      <div id="product-count-grid" className="count-text">
        {productLength ? (
          <>
            Showing <span className="count">{visibleStart}</span>-
            <span className="count">{visibleEnd}</span> of{" "}
            <span className="count">{productLength}</span> Products
          </>
        ) : (
          <>
            <span className="count">0</span> Products Found
          </>
        )}
      </div>

      <div id="applied-filters">
        {appliedFilters.map(([filterKey, setterKey]) => (
          <span
            key={filterKey}
            className="filter-tag"
            onClick={() => allProps[setterKey]("All")}
          >
            {allProps[filterKey]}
            <span className="remove-tag icon-close" />
          </span>
        ))}
        {allProps.color != "All" ? (
          <span
            className="filter-tag color-tag"
            onClick={() => allProps.setColor("All")}
          >
            <span className={`color bg-red ${allProps.color.className} `} />
            {allProps.color.name}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}

        {allProps.brands.length ? (
          <React.Fragment>
            {allProps.brands.map((brand, i) => (
              <span
                key={i}
                className="filter-tag"
                onClick={() => allProps.removeBrand(brand)}
              >
                {brand}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
      {appliedFilters.length ||
      allProps.color != "All" ||
      allProps.brands.length ? (
        <button
          id="remove-all"
          className="remove-all-filters text-btn-uppercase"
          onClick={allProps.clearFilter}
        >
          REMOVE ALL <i className="icon icon-close" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
