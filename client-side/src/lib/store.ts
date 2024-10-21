import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import documentsReducer from './features/documents/documentSlice';
import userReducer from './features/user/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      documents: documentsReducer,
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
