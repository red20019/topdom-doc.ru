import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BossSliceState, Item } from "./types";

const initialState: BossSliceState = {
  users: [
    {
      key: "1",
      id: 1,
      name: "John Brown",
      role: "boss",
      avatar: "",
      createdAt: "",
      email: "",
      email_verified_at: "",
      updatedAt: "",
    },
    {
      key: "2",
      id: 2,
      name: "Jim Green",
      role: "user",
      avatar: "",
      createdAt: "",
      email: "",
      email_verified_at: "",
      updatedAt: "",
    },
    {
      key: "3",
      id: 3,
      name: "Joe Black",
      role: "accountant",
      avatar: "",
      createdAt: "",
      email: "",
      email_verified_at: "",
      updatedAt: "",
    },
  ],
  data: [],
  dataSource: [
    {
      key: "0",
      name: "Документ 1",
      date: "12.12.1212",
    },
    {
      key: "1",
      name: "Документ 2",
      date: "01.01.1111",
    },
  ],
  editingKey: null,
  error: null,
  loading: false,
};

const bossSlice = createSlice({
  name: "boss",
  initialState,
  reducers: {
    changeRole: (
      state,
      action: PayloadAction<{ id: number; role: string }>
    ) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, role: action.payload.role };
        }
        return user;
      });
    },
    delete: (state, action: PayloadAction<string>) => {
      state.dataSource = state.dataSource.filter(
        (item) => item.key !== action.payload
      );
    },
    save: (
      state,
      action: PayloadAction<{ key: string; data: Partial<Item> }>
    ) => {
      const index = state.dataSource.findIndex(
        (item) => item.key === action.payload.key
      );
      state.dataSource[index] = {
        ...state.dataSource[index],
        ...action.payload.data,
      };
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

export const { changeRole, delete: deleteItem, save } = bossSlice.actions;

export default bossSlice.reducer;
