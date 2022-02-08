import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { table } from "console";
import type { RootState } from "../../store";
import { CellName, initialCellState, Table } from "../table/tableSlice";

// Define a type for the slice state
type Selected = {
  isSelecting: boolean;
  requiresAdditionalSelection: boolean;
  current: {
    selectionStart: CellName | null;
    selectionCorner: CellName | null;
    selectedCellNames: CellName[];
  };
  additional: {
    selectionStart: CellName | null;
    selectionCorner: CellName | null;
    selectedCellNames: CellName[];
  };
  focusedCell: CellName | null;
  editableCell: CellName | null;
  refresh: boolean;
};

// Define the initial state using that type
const initialState: Selected = {
  isSelecting: false,
  requiresAdditionalSelection: false,
  current: {
    selectionStart: null,
    selectionCorner: null,
    selectedCellNames: [],
  },
  additional: {
    selectionStart: null,
    selectionCorner: null,
    selectedCellNames: [],
  },
  focusedCell: null,
  editableCell: null,

  refresh: false,
};

export const selectedSlice = createSlice({
  name: "selected",
  // `selectedSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: (state) => ({ ...initialState }),

    startAdditionalSelection: (state) => {
      state.requiresAdditionalSelection = true;
    },

    stopAdditionalSelection: (state) => {
      state.requiresAdditionalSelection = false;
      state.additional.selectedCellNames = []
      state.additional.selectionStart = null;
      state.additional.selectionCorner = null;
    },

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
      if (!state.requiresAdditionalSelection) {
        state.current.selectionStart = action.payload;
        state.current.selectionCorner = action.payload;
        state.current.selectedCellNames = determineSelection(
          state.current.selectionStart,
          state.current.selectionCorner
        );
        if (state.current.selectionStart !== state.editableCell)
          state.editableCell = null;
        if (state.current.selectionStart !== state.focusedCell)
          state.focusedCell = null;
      } else {
        state.additional.selectionStart = action.payload;
        state.additional.selectionCorner = action.payload;
        state.additional.selectedCellNames = determineSelection(
          state.additional.selectionStart,
          state.additional.selectionCorner
        );
      }
    },

    setSelectionCorner: (state, action: PayloadAction<CellName>) => {
      if (!state.requiresAdditionalSelection) {
        if (
          !state.isSelecting ||
          !state.current.selectionStart ||
          state.editableCell
        )
          return;
        state.current.selectionCorner = action.payload;
        state.current.selectedCellNames = determineSelection(
          state.current.selectionStart,
          state.current.selectionCorner
        );
      } else {
        if (!state.isSelecting || !state.additional.selectionStart) return;
        state.additional.selectionCorner = action.payload;
        state.additional.selectedCellNames = determineSelection(
          state.additional.selectionStart,
          state.additional.selectionCorner
        );
      }
    },

    setFocusedCell: (state, action: PayloadAction<CellName>) => {
      if (!state.requiresAdditionalSelection) {
        state.focusedCell = action.payload;
        state.current.selectionStart = action.payload;
        state.current.selectionCorner = action.payload;
        state.current.selectedCellNames = determineSelection(
          state.current.selectionStart,
          state.current.selectionCorner
        );
        if (state.editableCell !== state.focusedCell) state.editableCell = null;
      }
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
  startAdditionalSelection,
  stopAdditionalSelection,
} = selectedSlice.actions;

//Added for backwards compatibility:
/*
if(type === "current" || type === "additional"){
  if(type === "current"){return }
  if(type === "additional"){return}
}else {
  return selectSelectedCellNames("current")(type)
}
*/

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedCellNames =
  (type: "current" | "additional") => (state: RootState) =>
    state.selected[type].selectedCellNames;

export const selectIsSelected =
  (cellname: CellName, type: "current" | "additional") => (state: RootState) =>
    state.selected[type].selectedCellNames.includes(cellname);

export const selectSelectedCells =
  (type: "current" | "additional") => (state: RootState) =>
    state.selected[type].selectedCellNames.reduce((selectedCells, cellname) => {
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
  (cellname: CellName, type: "current" | "additional") => (state: RootState) =>
    state.selected[type].selectionStart === cellname;

export const selectIsSelectionCorner =
  (cellname: CellName, type: "current" | "additional") => (state: RootState) =>
    state.selected[type].selectionCorner === cellname;

export const selectIsSelecting = (type: "current" | "additional") => (state: RootState) => type === "current" ?
  state.selected.isSelecting : state.selected.requiresAdditionalSelection

export const selectSelectionStart =
  (type: "current" | "additional") => (state: RootState) =>
    state.selected[type].selectionStart;

export const selectSelectionCorner =
  (type: "current" | "additional") => (state: RootState) =>
    state.selected[type].selectionCorner;

export const selectRefreshSelection = (state: RootState) =>
  state.selected.refresh;

export const selectFocusedCell = (state: RootState) =>
state.selected.focusedCell;

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
