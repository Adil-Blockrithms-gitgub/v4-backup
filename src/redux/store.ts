import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import refetchReducer from "./features/refetchSlice";
import userReducer from "./features/userSlice";
import toastReducer from "./features/toastSlice";
import lootboxCartReducer from "./features/lootboxCartSlice";

import { subgraphApi } from "@/services/subgraph";

export const store = configureStore({
  reducer: {
    refetch: refetchReducer,
    userData: userReducer,
    toast: toastReducer,
    lootboxCart: lootboxCartReducer,
    [subgraphApi.reducerPath]: subgraphApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(subgraphApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
