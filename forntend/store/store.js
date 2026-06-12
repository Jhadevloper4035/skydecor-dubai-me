import { configureStore } from "@reduxjs/toolkit";

import contentReducer from "./contentSlice";
import productsReducer from "./productsSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    products: productsReducer,
    ui: uiReducer,
  },
});
