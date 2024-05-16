import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DocsResponse, DocsSliceState, DocsType } from "./types";
import { docsAPI } from "../../api/api";

export const updateStage = createAsyncThunk(
  "docs/updateStage",
  async ({ id, status }: { id: number; status: string }, { dispatch }) => {
    try {
      dispatch(setConfirmLoading(true));
      const response = await docsAPI.updateStage(id, status);
      if (response.success === false) {
        console.log(response.message);
        return;
      }

      if (status === "accepted") {
        dispatch(setNewStage({ id, stage_number: 1 }));
      } else {
        dispatch(setNewStage({ id, stage_number: 3 }));
      }

      dispatch(setConfirmLoading(false));
    } catch (error: unknown) {
      dispatch(setConfirmLoading(false));
      dispatch(loadDocsFailure((error as Record<string, string>).message));
    }
  }
);

const initialState: DocsSliceState = {
  data: null,
  page: 1,
  limit: 10,
  meta: null,
  error: null,
  loading: false,
  confirmLoading: false,
  checkLoading: false,
};

const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    loadDocsStart: (state) => {
      state.loading = true;
    },
    loadDocsSuccess: (state, action: PayloadAction<DocsResponse>) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
      state.loading = false;
      state.error = null;
    },
    loadDocsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    emptyDocs: (state) => {
      if (state.meta) {
        state.data = null;
        state.meta.total = 0;
        state.page = 1;
        state.limit = 10;
        state.error = null;
        state.loading = false;
      }
    },
    togglePopconfirm: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      if (state.data) {
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.status === "accepted")
              return {
                ...item,
                openPopOk: !item.openPopOk,
                openPopCancel: false,
              };
            else
              return {
                ...item,
                openPopCancel: !item.openPopCancel,
                openPopOk: false,
              };
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
    setNewStage: (
      state,
      action: PayloadAction<{ id: number; stage_number: number }>
    ) => {
      if (state.data) {
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, stage_number: action.payload.stage_number };
          }
          return { ...item };
        });
      }
    },
  },
});

export const {
  loadDocsStart,
  loadDocsSuccess,
  loadDocsFailure,
  togglePopconfirm,
  closePopconfirm,
  setConfirmLoading,
  setNewStage,
  emptyDocs,
} = docsSlice.actions;
export default docsSlice.reducer;
