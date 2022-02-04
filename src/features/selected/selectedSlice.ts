import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { CellName, Table } from "../table/tableSlice";

// Define a type for the slice state
type Selected = CellName[];

// Define the initial state using that type
const initialState: Selected = [];

export const selectedSlice = createSlice({
  name: "selected",
  // `selectedSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: (state) => initialState,
    setSelected: (state, action: PayloadAction<CellName[] | CellName>) => {
      if(Array.isArray(action.payload)){
        return action.payload;
      }else {
        return [action.payload];
      }
    },
    addSelected:  (state, action: PayloadAction<CellName[] | CellName>) => {
      if(Array.isArray(action.payload)){
        return [...state, ...action.payload];
      }else {
        return [...state, action.payload];
      }
    }
  },
});

export const { reset, setSelected, addSelected } = selectedSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedCellNames = (state: RootState) => state.selected;
export const selectSelectedCells = (state: RootState)=> {
  const selected = state.selected 
  const filteredTable = Object.entries(state.table.present).filter((arr) => { 
    const [cellname, value] = arr;
    return selected.includes(cellname as CellName);
  })
  return Object.fromEntries(filteredTable) as Table; 
 //console.log("object entries", filteredTable)
}

export default selectedSlice.reducer;

