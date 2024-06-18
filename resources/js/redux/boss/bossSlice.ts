import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BossSliceState, Item } from "./types";
import { UserType } from "../user/types";

const initialState: BossSliceState = {
  users: [],
  data: [],
  form: null,
  editingKey: null,
  error: null,
  loading: false,
};

const bossSlice = createSlice({
  name: "boss",
  initialState,
  reducers: {
    changeRole: (state, action: PayloadAction<UserType>) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, role: action.payload.role };
        }
        return user;
      });
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    removeDoc: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setData: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
    },
    startEdit: (state, action: PayloadAction<string>) => {
      state.editingKey = action.payload;
    },
    stopEdit: (state) => {
      state.editingKey = null;
    },
    saveRow: (state, action: PayloadAction<{ index: number; value: Item }>) => {
      const { index, value } = action.payload;
      state.data[index] = value;
    },
    // updateUserStart: (state) => {
    //   state.loading = true;
    // },
    // updateUserSuccess: (state, action: PayloadAction<UserType>) => {
    //   state.currentUser = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },
    // updateUserFailure: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    // deleteUserStart: (state) => {
    //   state.loading = true;
    // },
    // deleteUserSuccess: (state) => {
    //   state.currentUser = null;
    //   state.loading = false;
    //   state.error = null;
    // },
    // deleteUserFailure: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
  },
});

export const {
  changeRole,
  setForm,
  removeDoc,
  setData,
  startEdit,
  stopEdit,
  saveRow,
} = bossSlice.actions;

export default bossSlice.reducer;
