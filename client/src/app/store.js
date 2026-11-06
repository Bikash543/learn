import { configureStore } from "@reduxjs/toolkit";
import { transactionApi } from "../features/transactions/transactionApi.js";

export const store = configureStore({
  reducer: {
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionApi.middleware),
});