import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { CellName, initialCellState, Table } from "../table/tableSlice";

// Define a type for the slice state
type Selected = {
  isSelecting: boolean;
  selectionStart: CellName | null;
  selectionCorner: CellName | null;
  focusedCell: CellName | null;
  editableCell: CellName | null;
  selectedCellNames: CellName[];
  refresh: boolean;
};

// Define the initial state using that type
const initialState: Selected = {
  isSelecting: false,
  selectionStart: null,
  selectionCorner: null,
  focusedCell: null,
  editableCell: null,
  selectedCellNames: [],
  refresh: false,
};

export const selectedSlice = createSlice({
  name: "selected",
  // `selectedSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    reset: (state) => ({ ...initialState }),

    startSelection: (state) => {
      state.isSelecting = true;
    },

    endSelection: (state) => {
      state.isSelecting = false;
    },

    //Switching state back and forth to cause rerender in the Selection Component (meant to be dispatched when the size of an element might change)
    refreshSelection: (state) => {
      state.refresh = !state.refresh;
    },

    setSelectionStart: (state, action: PayloadAction<CellName>) => {
      state.selectionStart = action.payload;
      state.selectionCorner = action.payload;
      state.selectedCellNames = determineSelection(
        state.selectionStart,
        state.selectionCorner
      );
      if (state.selectionStart !== state.editableCell)
        state.editableCell = null;
      if (state.selectionStart !== state.focusedCell) state.focusedCell = null;
    },

    setSelectionCorner: (state, action: PayloadAction<CellName>) => {
      if (!state.isSelecting || !state.selectionStart || state.editableCell)
        return;
      state.selectionCorner = action.payload;
      state.selectedCellNames = determineSelection(
        state.selectionStart,
        state.selectionCorner
      );
    },

    setFocusedCell: (state, action: PayloadAction<CellName>) => {
      state.focusedCell = action.payload;
      state.selectionStart = action.payload;
      state.selectionCorner = action.payload;
      state.selectedCellNames = determineSelection(
        state.selectionStart,
        state.selectionCorner
      );
      if (state.editableCell !== state.focusedCell) state.editableCell = null;
    },

    setEditableCell: (state, action: PayloadAction<CellName>) => {
      state.editableCell = action.payload;
    },

  },
});

export const {
  reset,
  startSelection,
  endSelection,
  setSelectionStart,
  setSelectionCorner,
  setFocusedCell,
  setEditableCell,
  refreshSelection,
} = selectedSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedCellNames = (state: RootState) =>
  state.selected.selectedCellNames;

export const selectIsSelected = (cellname: CellName) => (state: RootState) =>
  state.selected.selectedCellNames.includes(cellname);

export const selectSelectedCells = (state: RootState) =>
  state.selected.selectedCellNames.reduce((selectedCells, cellname) => {
    selectedCells[cellname] = state.table.present[cellname]
      ? state.table.present[cellname]
      : initialCellState;
    return selectedCells;
  }, {} as Table);

export const selectIsFocused = (cellname: CellName) => (state: RootState) =>
  state.selected.focusedCell === cellname;

export const selectIsEditable = (cellname: CellName) => (state: RootState) =>
  state.selected.editableCell === cellname;

export const selectIsSelectionStart =
  (cellname: CellName) => (state: RootState) =>
    state.selected.selectionStart === cellname;

export const selectIsSelectionCorner =
  (cellname: CellName) => (state: RootState) =>
    state.selected.selectionCorner === cellname;

export const selectIsSelecting = (state: RootState) =>
  state.selected.isSelecting;

export const selectSelectionStart = (state: RootState) =>
  state.selected.selectionStart;

export const selectSelectionCorner = (state: RootState) =>
  state.selected.selectionCorner;

export const selectRefreshSelection = (state: RootState) =>
  state.selected.refresh;


//Determines Selection based on both corners
function determineSelection(
  selectionStart: CellName,
  selectionCorner: CellName
) {
  let startCords = selectionStart
    .split(",")
    .map((str) => Number.parseInt(str))
    .reduce((coords, value, index) => {
      if (index === 0) return { ...coords, x: value };
      if (index === 1) return { ...coords, y: value };
      return coords;
    }, {} as { x: number; y: number });

  let endCords = selectionCorner
    .split(",")
    .map((str) => Number.parseInt(str))
    .reduce((coords, value, index) => {
      if (index === 0) return { ...coords, x: value };
      if (index === 1) return { ...coords, y: value };
      return coords;
    }, {} as { x: number; y: number });

  const selection: CellName[] = [];
  for (
    let x = startCords.x;
    startCords.x <= endCords.x ? x <= endCords.x : x >= endCords.x;
    startCords.x <= endCords.x ? x++ : x--
  ) {
    for (
      let y = startCords.y;
      startCords.y <= endCords.y ? y <= endCords.y : y >= endCords.y;
      startCords.y <= endCords.y ? y++ : y--
    ) {
      selection.push(`${x},${y}`);
    }
  }
  return selection;
}

export default selectedSlice.reducer;
