import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DocsSliceState, DocsType } from "./types";
import { docsAPI } from "../../api/api";

export const updateStage = createAsyncThunk(
  "docs/updateStage",
  async ({ id, status }: { id: number; status: string }) => {
    try {
      setConfirmLoading(true);
      const response = await docsAPI.updateStage(id, status);

      if (response.success === false) {
        console.log(response.message);
        return;
      }
      setConfirmLoading(false);
    } catch (error: unknown) {
      setConfirmLoading(false);
      loadDocsFailure((error as Record<string, string>).message);
    }
  }
);

const initialState: DocsSliceState = {
  data: null,
  total: 0,
  page: 1,
  limit: 10,
  error: null,
  loading: false,
  confirmLoading: false,
};

const docsSlice = createSlice({
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
              return { ...item, openPopOk: !item.openPopOk, openPopCancel: false };
            else return { ...item, openPopCancel: !item.openPopCancel, openPopOk: false };
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
    setConfirmLoading: (state, action: PayloadAction<boolean>) => {
      state.confirmLoading = action.payload;
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
  setConfirmLoading,
  emptyDocs,
} = docsSlice.actions;
export default docsSlice.reducer;
