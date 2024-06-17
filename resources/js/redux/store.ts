import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice";
import siderReducer from "./sider/siderSlice";
import docsReducer from "./docs/docsSlice";
import bossReducer from "./boss/bossSlice";
import documentReducer from "./document/documentSlice";

const rootReducer = combineReducers({
  user: userReducer,
  sider: siderReducer,
  docs: docsReducer,
  boss: bossReducer,
  document: documentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
