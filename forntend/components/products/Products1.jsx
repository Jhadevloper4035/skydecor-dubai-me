"use client";

import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useMemo, useReducer, useState } from "react";
import FilterModal from "./FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import FilterMeta from "./FilterMeta";
import {
  filterProductsLocally,
  localProducts,
} from "@/lib/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductFilters,
  fetchProducts,
  selectProductFilterOptions,
  selectProductItems,
  selectProductsStatus,
} from "@/store/productsSlice";

const normalizeFilterValue = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

const productContainsQuery = (product, query) => {
  if (!query) return true;

  const normalizedQuery = query.trim().toLowerCase();
  const searchableValues = [
    product.productName,
    product.title,
    product.designName,
    product.productCode,
    product.productType,
    product.category,
    product.subCategory,
    product.texture,
    product.textureCode,
    product.size,
    product.thickness,
    product.width,
  ];

  return searchableValues.some((value) =>
    String(value || "").toLowerCase().includes(normalizedQuery)
  );
};

const filterProductsByRoute = (products, { productType, category, subCategory, query }) => {
  const productTypeSlug = normalizeFilterValue(productType);
  const categorySlug = normalizeFilterValue(category);
  const subCategorySlug = normalizeFilterValue(subCategory);

  return products.filter((product) => {
    
    const currentProductType = normalizeFilterValue(product.productType);
    const currentProductTypeSlug = normalizeFilterValue(product.productTypeSlug);
    const productCategory = normalizeFilterValue(product.category);
    const productCategorySlug = normalizeFilterValue(product.categorySlug);
    const productSubCategory = normalizeFilterValue(product.subCategory);
    const productSubCategorySlug = normalizeFilterValue(product.subCategorySlug);

    const productTypeMatches =
      !productTypeSlug ||
      currentProductType === productTypeSlug ||
      currentProductTypeSlug === productTypeSlug;
    const categoryMatches =
      !categorySlug ||
      productCategory === categorySlug ||
      productCategorySlug === categorySlug;
    const subCategoryMatches =
      !subCategorySlug ||
      productSubCategory === subCategorySlug ||
      productSubCategorySlug === subCategorySlug;

    return (
      productTypeMatches &&
      categoryMatches &&
      subCategoryMatches &&
      productContainsQuery(product, query)
    );
  });
};

const selectedFilterValue = (value) => (value === "All" ? "" : value);

export default function Products1({
  parentClass = "flat-spacing",
  initialProductType = "",
  initialCategory = "",
  initialSubCategory = "",
  initialQuery = "",
}) {
  const [activeLayout, setActiveLayout] = useState(4);
  const storeDispatch = useAppDispatch();
  const storeProducts = useAppSelector(selectProductItems);
  const productsStatus = useAppSelector(selectProductsStatus);
  const filterOptions = useAppSelector(selectProductFilterOptions);
  const routeFilters = useMemo(
    () => ({
      productType: initialProductType,
      category: initialCategory,
      subCategory: initialSubCategory,
      query: initialQuery,
    }),
    [initialProductType, initialCategory, initialSubCategory, initialQuery]
  );
  const routeProducts = useMemo(
    () => filterProductsByRoute(localProducts, routeFilters),
    [routeFilters]
  );
  const sourceProducts =
    productsStatus === "idle" || productsStatus === "loading"
      ? routeProducts
      : storeProducts;
  const [state, filterDispatch] = useReducer(reducer, {
    ...initialState,
    productType: initialProductType || initialState.productType,
    category: initialCategory || initialState.category,
    subCategory: initialSubCategory || initialState.subCategory,
  });
  const {
    price,
    availability,
    color,
    size,
    productType,
    category,
    subCategory,
    texture,
    thickness,
    width,
    brands,

    filtered,
    sortingOption,
    sorted,

    activeFilterOnSale,
    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    filterOptions,
    setPrice: (value) => filterDispatch({ type: "SET_PRICE", payload: value }),

    setColor: (value) => {
      value == color
        ? filterDispatch({ type: "SET_COLOR", payload: "All" })
        : filterDispatch({ type: "SET_COLOR", payload: value });
    },
    setSize: (value) => {
      value == size
        ? filterDispatch({ type: "SET_SIZE", payload: "All" })
        : filterDispatch({ type: "SET_SIZE", payload: value });
    },
    setProductType: (value) => {
      filterDispatch({
        type: "SET_PRODUCT_TYPE",
        payload: value == productType ? "All" : value,
      });
      filterDispatch({ type: "SET_CATEGORY", payload: "All" });
      filterDispatch({ type: "SET_SUB_CATEGORY", payload: "All" });
      filterDispatch({ type: "SET_TEXTURE", payload: "All" });
      filterDispatch({ type: "SET_SIZE", payload: "All" });
      filterDispatch({ type: "SET_THICKNESS", payload: "All" });
      filterDispatch({ type: "SET_WIDTH", payload: "All" });
    },
    setCategory: (value) => {
      filterDispatch({
        type: "SET_CATEGORY",
        payload: value == category ? "All" : value,
      });
      filterDispatch({ type: "SET_SUB_CATEGORY", payload: "All" });
      filterDispatch({ type: "SET_TEXTURE", payload: "All" });
      filterDispatch({ type: "SET_SIZE", payload: "All" });
      filterDispatch({ type: "SET_THICKNESS", payload: "All" });
      filterDispatch({ type: "SET_WIDTH", payload: "All" });
    },
    setSubCategory: (value) => {
      filterDispatch({
        type: "SET_SUB_CATEGORY",
        payload: value == subCategory ? "All" : value,
      });
      filterDispatch({ type: "SET_TEXTURE", payload: "All" });
      filterDispatch({ type: "SET_SIZE", payload: "All" });
      filterDispatch({ type: "SET_THICKNESS", payload: "All" });
      filterDispatch({ type: "SET_WIDTH", payload: "All" });
    },
    setTexture: (value) => {
      filterDispatch({
        type: "SET_TEXTURE",
        payload: value == texture ? "All" : value,
      });
      filterDispatch({ type: "SET_SIZE", payload: "All" });
      filterDispatch({ type: "SET_THICKNESS", payload: "All" });
      filterDispatch({ type: "SET_WIDTH", payload: "All" });
    },
    setThickness: (value) => {
      filterDispatch({
        type: "SET_THICKNESS",
        payload: value == thickness ? "All" : value,
      });
    },
    setWidth: (value) => {
      filterDispatch({
        type: "SET_WIDTH",
        payload: value == width ? "All" : value,
      });
    },
    setAvailability: (value) => {
      value == availability
        ? filterDispatch({ type: "SET_AVAILABILITY", payload: "All" })
        : filterDispatch({ type: "SET_AVAILABILITY", payload: value });
    },

    setBrands: (newBrand) => {
      const updated = [...brands].includes(newBrand)
        ? [...brands].filter((elm) => elm != newBrand)
        : [...brands, newBrand];
      filterDispatch({ type: "SET_BRANDS", payload: updated });
    },
    removeBrand: (newBrand) => {
      const updated = [...brands].filter((brand) => brand != newBrand);

      filterDispatch({ type: "SET_BRANDS", payload: updated });
    },
    setSortingOption: (value) =>
      filterDispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () => filterDispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    setCurrentPage: (value) =>
      filterDispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      filterDispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        filterDispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => {
      filterDispatch({ type: "CLEAR_FILTER" });
    },
  };

  useEffect(() => {
    filterDispatch({
      type: "SET_PRODUCT_TYPE",
      payload: initialProductType || "All",
    });
    filterDispatch({
      type: "SET_CATEGORY",
      payload: initialCategory || "All",
    });
    filterDispatch({
      type: "SET_SUB_CATEGORY",
      payload: initialSubCategory || "All",
    });
    filterDispatch({ type: "SET_TEXTURE", payload: "All" });
    filterDispatch({ type: "SET_SIZE", payload: "All" });
    filterDispatch({ type: "SET_THICKNESS", payload: "All" });
    filterDispatch({ type: "SET_WIDTH", payload: "All" });
    filterDispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [initialProductType, initialCategory, initialSubCategory, initialQuery]);

  useEffect(() => {
    const apiFilters = {
      productType: selectedFilterValue(productType) || initialProductType,
      category: selectedFilterValue(category) || initialCategory,
      subCategory: selectedFilterValue(subCategory) || initialSubCategory,
      texture: selectedFilterValue(texture),
    };

    storeDispatch(fetchProductFilters(apiFilters));
  }, [
    storeDispatch,
    productType,
    category,
    subCategory,
    texture,
    initialProductType,
    initialCategory,
    initialSubCategory,
  ]);

  useEffect(() => {
    storeDispatch(fetchProducts({
      limit: 1000,
      isActive: true,
    }));
  }, [storeDispatch]);

  useEffect(() => {
    const products = filterProductsLocally(sourceProducts, {
      productType: selectedFilterValue(productType) || initialProductType,
      query: initialQuery,
      category: selectedFilterValue(category) || initialCategory,
      subCategory: selectedFilterValue(subCategory) || initialSubCategory,
      texture: selectedFilterValue(texture),
      size: size !== "All" && size !== "Free Size" ? size : "",
      thickness: selectedFilterValue(thickness),
      width: selectedFilterValue(width),
    });
    let filteredArrays = [];

    if (availability !== "All") {
      const filteredByAvailability = [...products].filter(
        (elm) => elm.inStock === availability.value
      );
      filteredArrays = [...filteredArrays, filteredByAvailability];
    }

    if (brands.length) {
      const filteredByBrands = [...products].filter((elm) =>
        brands.every((el) => elm.filterBrands.includes(el))
      );
      filteredArrays = [...filteredArrays, filteredByBrands];
    }
    if (color !== "All") {
      const filteredByColor = [...products].filter((elm) =>
        elm.filterColor.includes(color.name)
      );
      filteredArrays = [...filteredArrays, filteredByColor];
    }
    if (activeFilterOnSale) {
      const filteredByonSale = [...products].filter((elm) => elm.oldPrice);
      filteredArrays = [...filteredArrays, filteredByonSale];
    }

    const filteredByPrice = [...products].filter(
      (elm) => elm.price >= price[0] && elm.price <= price[1]
    );
    filteredArrays = [...filteredArrays, filteredByPrice];

    const commonItems = [...products].filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    filterDispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [
    sourceProducts,
    productType,
    category,
    subCategory,
    texture,
    size,
    thickness,
    width,
    availability,
    initialProductType,
    initialCategory,
    initialSubCategory,
    initialQuery,
    price,
    color,
    brands,
    activeFilterOnSale,
  ]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      filterDispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      filterDispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Title Ascending") {
      filterDispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Title Descending") {
      filterDispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      filterDispatch({ type: "SET_SORTED", payload: filtered });
    }
    filterDispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / itemPerPage));
  const paginatedProducts = sorted.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <>
      <section className={parentClass}>
        <div className="container">
          <div className="tf-shop-control">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="filterShop"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filters</span>
              </a>
              <div
                onClick={allProps.toggleFilterWithOnSale}
                className={`d-none d-lg-flex shop-sale-text ${
                  activeFilterOnSale ? "active" : ""
                }`}
              >
                <i className="icon icon-checkCircle" />
                <p className="text-caption-1">Shop sale items only</p>
              </div>
            </div>
            <ul className="tf-control-layout">
              <LayoutHandler
                setActiveLayout={setActiveLayout}
                activeLayout={activeLayout}
              />
            </ul>
            <div className="tf-control-sorting">
              <p className="d-none d-lg-block text-caption-1">Sort by:</p>
              <Sorting allProps={allProps} />
            </div>
          </div>
          <div className="wrapper-control-shop">
            <FilterMeta productLength={sorted.length} allProps={allProps} />

            {activeLayout == 1 ? (
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                <Listview
                  products={paginatedProducts}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={allProps.setCurrentPage}
                />
              </div>
            ) : (
              <div
                className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`}
                id="gridLayout"
              >
                <GridView
                  products={paginatedProducts}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={allProps.setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <FilterModal allProps={allProps} />
    </>
  );
}
