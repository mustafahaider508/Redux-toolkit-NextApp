// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todos  from "../actions/todoSlice";

// ** Reducers

export const store = configureStore({
  reducer: {
    todos
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
