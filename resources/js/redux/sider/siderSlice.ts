import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SiderSliceState } from "./types";

const initialState: SiderSliceState = {
  selectedKeys: ["0"],
};

const siderSlice = createSlice({
  name: "sider",
  initialState,
  reducers: {
    changeMenuItem: (state, action: PayloadAction<string[]>) => {
      state.selectedKeys = action.payload;
    },
  },
});

export const { changeMenuItem } = siderSlice.actions;
export default siderSlice.reducer;
