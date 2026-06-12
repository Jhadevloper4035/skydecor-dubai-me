import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingCount: 0,
  isInitialLoading: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      if (action.payload) {
        state.loadingCount += 1;
        return;
      }

      state.loadingCount = Math.max(0, state.loadingCount - 1);
    },
    setInitialLoading: (state, action) => {
      state.isInitialLoading = action.payload;
    },
    resetLoading: (state) => {
      state.loadingCount = 0;
      state.isInitialLoading = false;
    },
  },
});

export const { resetLoading, setInitialLoading, setIsLoading } = uiSlice.actions;

export const selectIsLoading = (state) =>
  state.ui.isInitialLoading || state.ui.loadingCount > 0;

export default uiSlice.reducer;
