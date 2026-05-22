"use client";
import { allProducts } from "@/data/products";
import React, { useContext, useState } from "react";

const dataContext = React.createContext();

export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
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
    if (!compareItem.some((itemId) => isSameId(itemId, id))) {
      setCompareItem((pre) => [...pre, id]);
    }
  };

  const removeFromCompareItem = (id) => {
    if (compareItem.some((itemId) => isSameId(itemId, id))) {
      setCompareItem((pre) => [...pre.filter((elm) => !isSameId(elm, id))]);
    }
  };

  const isAddedtoCompareItem = (id) => {
    return compareItem.some((itemId) => isSameId(itemId, id));
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
