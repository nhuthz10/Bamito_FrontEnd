import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import paginationSlice from "./paginationSlice";
import productSlice from "./productSlice";
import adminSlice from "./adminSlice";
import searchSlice from "./searchSlice";
import orderSlice from "./orderSlice";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["login", "userInfo", "favourites", "cartId"],
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userSlice),
    order: orderSlice,
    pagination: paginationSlice,
    product: productSlice,
    search: searchSlice,
    admin: adminSlice,
  },
  middleware: customizedMiddleware,
});

export const persistor = persistStore(store);

export default store;
