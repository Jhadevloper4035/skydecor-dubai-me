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
  const [quickAddItem, setQuickAddItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const isSameId = (left, right) => String(left) === String(right);

  const addToWishlist = (id) => {
    if (!wishlist.some((itemId) => isSameId(itemId, id))) {
      setWishlist((prev) => [...prev, id]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((itemId) => !isSameId(itemId, id)));
  };

  const isAddedtoWishlist = (id) => {
    return wishlist.some((itemId) => isSameId(itemId, id));
  };

  const addProductToCart = (id, quantity = 1) => {
    setCartProducts((prev) => {
      if (prev.some((item) => isSameId(item.id, id))) {
        return prev;
      }

      return [...prev, { id, quantity }];
    });
  };

  const removeProductFromCart = (id) => {
    setCartProducts((prev) => prev.filter((item) => !isSameId(item.id, id)));
  };

  const isAddedToCartProducts = (id) => {
    return cartProducts.some((item) => isSameId(item.id, id));
  };

  const updateQuantity = (id, quantity) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        isSameId(item.id, id)
          ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
          : item
      )
    );
  };

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
    quickAddItem,
    setQuickAddItem,
    wishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    isAddedtoWishlist,
    cartProducts,
    setCartProducts,
    addProductToCart,
    removeProductFromCart,
    isAddedToCartProducts,
    updateQuantity,
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
