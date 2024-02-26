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
    emptyDocs: (state) => {
      state.data = null;
      state.total = 0;
      state.page = 1;
      state.limit = 10;
      state.error = null;
      state.loading = false;
    },
    loadDocsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    togglePopconfirm: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      if (state.data) {
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.status === "accepted")
              return { ...item, openPopOk: !item.openPopOk };
            else return { ...item, openPopCancel: !item.openPopCancel };
          }
          return { ...item, openPopOk: false, openPopCancel: false };
        });
      }
    },
    closePopconfirm: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data = state.data.map((item) => {
          if (item.id === action.payload) {
            return { ...item, openPopOk: false, openPopCancel: false };
          }
          return { ...item, openPopOk: false, openPopCancel: false };
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
  closePopconfirm,
  emptyDocs,
} = userSlice.actions;
export default userSlice.reducer;
