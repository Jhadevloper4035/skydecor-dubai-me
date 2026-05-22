"use client";

import { availabilityOptions } from "@/data/productFilterOptions";
import CascadingProductFilters from "./CascadingProductFilters";

import RangeSlider from "react-range-slider-input";

const normalizeValue = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

const SelectGroup = ({ title, placeholder, options = [], activeValue, onSelect }) => {
  if (!options.length) return null;

  const selectValue =
    options.find((option) => normalizeValue(option) === normalizeValue(activeValue)) ||
    "";

  return (
    <div className="widget-facet sd-filter-select-facet">
      <label className="sd-cascade-filter__field">
        <span>{title}</span>
        <select
          value={selectValue}
          onChange={(event) => onSelect(event.target.value || "All")}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default function FilterModal({ allProps }) {
  const filterOptions = allProps.filterOptions || {};

  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <h5>Filters</h5>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body">
          <CascadingProductFilters
            allProps={allProps}
            showHeader={false}
            className="sd-cascade-filter--modal"
          />
          <div className="widget-facet facet-price">
            <h6 className="facet-title">Price</h6>

            <RangeSlider
              min={0}
              max={450}
              value={allProps.price}
              onInput={(value) => allProps.setPrice(value)}
            />
            <div className="box-price-product mt-3">
              <div className="box-price-item">
                <span className="title-price">Min price</span>
                <div
                  className="price-val"
                  id="price-min-value"
                  data-currency="$"
                >
                  {allProps.price[0]}
                </div>
              </div>
              <div className="box-price-item">
                <span className="title-price">Max price</span>
                <div
                  className="price-val"
                  id="price-max-value"
                  data-currency="$"
                >
                  {allProps.price[1]}
                </div>
              </div>
            </div>
          </div>
          <SelectGroup
            title="Width"
            placeholder="All Widths"
            options={filterOptions.widths}
            activeValue={allProps.width}
            onSelect={allProps.setWidth}
          />
          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Availability</h6>
            <div className="box-fieldset-item">
              {availabilityOptions.map((option, index) => (
                <fieldset
                  key={index}
                  className="fieldset-item"
                  onClick={() => allProps.setAvailability(option)}
                >
                  <input
                    type="radio"
                    name="availability"
                    className="tf-check"
                    readOnly
                    checked={allProps.availability === option}
                  />
                  <label>
                    {option.label}
                  </label>
                </fieldset>
              ))}
            </div>
          </div>
        </div>
        <div className="canvas-bottom">
          <button
            id="reset-filter"
            onClick={allProps.clearFilter}
            className="tf-btn btn-reset"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
