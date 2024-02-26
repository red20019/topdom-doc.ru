import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DocsSliceState, DocsType } from "./types";

const initialState: DocsSliceState = {
  data: null,
  total: 0,
  page: 1,
  limit: 10,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    loadDocsStart: (state) => {
      state.loading = true;
    },
    loadDocsSuccess: (state, action: PayloadAction<DocsType[]>) => {
      state.data = action.payload;
      state.total = action.payload.length;
      state.loading = false;
      state.error = null;
    },
    loadDocsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    togglePopconfirm: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data = state.data.map((item) => {
          if (item.id === action.payload) {
            return { ...item, openPop: !item.openPop };
          }
          return { ...item, openPop: false };
        });
      }
    },
    // updateStage: (state, action: PayloadAction<number>) => {
    // },
  },
});

export const {
  loadDocsStart,
  loadDocsSuccess,
  loadDocsFailure,
  togglePopconfirm,
} = userSlice.actions;
export default userSlice.reducer;
