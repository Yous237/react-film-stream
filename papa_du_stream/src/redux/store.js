import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import ratingReducer from './ratingSlice';


const store = configureStore({
  reducer: combineReducers({
    favorite: persistReducer({key: 'favorite', storage}, favoriteReducer ),
    rating: persistReducer({ key: 'rating', storage }, ratingReducer),

  }),
});

export default store;
export const persistor = persistStore(store);