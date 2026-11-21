"use client";
import { allProducts } from "@/data/products";
import {
  addCompareItem,
  clearCompareItems,
  removeCompareItem,
  selectCompareItems,
  setCompareItems,
} from "@/store/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useContext, useState } from "react";

const dataContext = React.createContext();

export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const dispatch = useAppDispatch();
  const compareItem = useAppSelector(selectCompareItems);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);

  const isSameId = (left, right) => String(left) === String(right);

  const addToCompareItem = (id) => {
    dispatch(addCompareItem(id));
  };

  const removeFromCompareItem = (id) => {
    dispatch(removeCompareItem(id));
  };

  const isAddedtoCompareItem = (id) => {
    return compareItem.some((itemId) => isSameId(itemId, id));
  };

  const setCompareItem = (value) => {
    const nextItems = typeof value === "function" ? value(compareItem) : value;

    if (!nextItems?.length) {
      dispatch(clearCompareItems());
      return;
    }

    dispatch(setCompareItems(nextItems));
  };

  const contextElement = {
    quickViewItem,
    setQuickViewItem,
    compareItem,
    setCompareItem,
    addToCompareItem,
    removeFromCompareItem,
    isAddedtoCompareItem,
  };

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
