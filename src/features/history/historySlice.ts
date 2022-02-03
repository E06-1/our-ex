import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Table, initialState as initialTableState } from "../table/tableSlice";

// Define a type for the slice state
type History = {
  selectedEntry: number;
  entries: Table[];
};

// Define the initial state using that type
const initialState: History = {
  selectedEntry: 0,
  entries: [initialTableState],
};

export const historySlice = createSlice({
  name: "history",
  // `selectedSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = historySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHistory = (state: RootState) => state.history;

export default historySlice.reducer;
