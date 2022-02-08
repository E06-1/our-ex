import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CellName } from "../table/tableSlice";



// Define the initial state using that type
export const initialState: CellName[] = [];

export const searchSlice = createSlice({
  name: "search",
  // `tableSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<CellName[]>) => action.payload
  }
});

export const { setSearchResults } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsSearchResult = (cellname: CellName) =>  (state: RootState) => state.search.includes(cellname);

export default searchSlice.reducer;
