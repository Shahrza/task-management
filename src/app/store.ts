import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../features/sign-in/authSlice";
import homeReducer from "../features/home/homeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
