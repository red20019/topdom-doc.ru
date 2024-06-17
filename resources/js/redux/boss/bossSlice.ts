import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BossSliceState } from './types';
import { UserType } from '../user/types';

const initialState: BossSliceState = {
  users: [],
  error: null,
  loading: false,
};

const bossSlice = createSlice({
  name: 'boss',
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
    removeDoc: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    }
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
  removeDoc
} = bossSlice.actions;
export default bossSlice.reducer;
