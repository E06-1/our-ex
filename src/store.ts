import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import tableReducer, {
  initialCellState,
  initialState,
} from "./features/table/tableSlice";
import selectedReducer from "./features/selected/selectedSlice";
import styleReducer from "./features/style/styleSlice";
import undoable, { StateWithHistory, excludeAction } from "redux-undo";
import type { Table } from "./features/table/tableSlice";
import { Reducer } from "react";

export const store = configureStore({
  reducer: {
    table:undoable(tableReducer, {filter: excludeAction("table/init")}),
    selected: selectedReducer,
    style: styleReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
