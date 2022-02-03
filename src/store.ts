import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import tableReducer from "./features/table/tableSlice";
import selectedReducer from "./features/selected/selectedSlice";
import historyReducer from "./features/history/historySlice";

export const store = configureStore({
  reducer: {
      table: tableReducer,
      selected: selectedReducer,
      history: historyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;