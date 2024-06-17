import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DocumentType } from "../docs/types";

const initialState: DocumentType = {
  check_files: [],
  created_at: "",
  document_tracking: [],
  files: [],
  id: 0,
  name: "",
  stage: 0,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    saveDocument: (state, action: PayloadAction<DocumentType>) => {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
});

export const { saveDocument } = documentSlice.actions;
export default documentSlice.reducer;
