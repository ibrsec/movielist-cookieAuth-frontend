import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loginSlice from "../features/loginSlice";
import { persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import movieSlice from "../features/movieSlice";
// import categorySlice from "../features/categorySlice";
const rootReducer = combineReducers({
    login:loginSlice,
    movie:movieSlice,
    // category:categorySlice,
})

const persistConfig = {
    key:"movie-fs-fe",
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export const  persistor = persistStore(store);