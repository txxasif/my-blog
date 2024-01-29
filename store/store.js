import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import favoriteSlice from "./favorite/favoriteSlice";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  favorite: favoriteSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorite"],
};

const persistReducers = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistReducers,
});

export const persistStoreS = persistStore(store);
