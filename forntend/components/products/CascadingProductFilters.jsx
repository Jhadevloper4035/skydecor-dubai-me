"use client";

const normalizeValue = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

const selectOptionValue = (options = [], activeValue = "") => {
  if (!activeValue || activeValue === "All") return "";

  return (
    options.find((option) => normalizeValue(option) === normalizeValue(activeValue)) ||
    activeValue
  );
};

const filterFields = [
  {
    key: "productType",
    label: "Product Type",
    placeholder: "All Types",
    optionsKey: "productTypes",
    setterKey: "setProductType",
  },
  {
    key: "category",
    label: "Category",
    placeholder: "All Categories",
    optionsKey: "categories",
    setterKey: "setCategory",
  },
  {
    key: "subCategory",
    label: "Sub-Category",
    placeholder: "All Sub-Categories",
    optionsKey: "subCategories",
    setterKey: "setSubCategory",
  },
  {
    key: "texture",
    label: "Texture",
    placeholder: "All Textures",
    optionsKey: "textures",
    setterKey: "setTexture",
  },
  {
    key: "size",
    label: "Size",
    placeholder: "All Sizes",
    optionsKey: "sizes",
    setterKey: "setSize",
  },
  {
    key: "thickness",
    label: "Thickness",
    placeholder: "All Thicknesses",
    optionsKey: "thicknesses",
    setterKey: "setThickness",
  },
];

export default function CascadingProductFilters({
  allProps,
  productLength,
  showHeader = true,
  className = "",
}) {
  const filterOptions = allProps.filterOptions || {};
  const selected = filterOptions.selected || {};

  const hasActiveFilters =
    filterFields.some(({ key }) => allProps[key] !== "All") ||
    allProps.width !== "All" ||
    allProps.availability !== "All" ||
    allProps.color !== "All" ||
    allProps.brands.length > 0 ||
    allProps.activeFilterOnSale;

  return (
    <div className={`sd-cascade-filter ${className}`.trim()}>
      {showHeader ? (
        <div className="sd-cascade-filter__header">
          <div>
            <h5>Filters</h5>
            {productLength !== undefined ? (
              <span>{productLength} Products Found</span>
            ) : null}
          </div>
          <button
            type="button"
            className="sd-cascade-filter__clear"
            onClick={allProps.clearFilter}
            disabled={!hasActiveFilters}
          >
            Clear All
          </button>
        </div>
      ) : null}

      <div className="sd-cascade-filter__grid">
        {filterFields.map(({ key, label, placeholder, optionsKey, setterKey }) => {
          const options = filterOptions[optionsKey] || [];
          const activeValue = allProps[key] !== "All" ? allProps[key] : selected[key];
          const selectValue = selectOptionValue(options, activeValue);

          return (
            <label key={key} className="sd-cascade-filter__field">
              <span>{label}</span>
              <select
                value={selectValue}
                onChange={(event) =>
                  allProps[setterKey](event.target.value || "All")
                }
                disabled={!options.length}
              >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
    </div>
  );
}
