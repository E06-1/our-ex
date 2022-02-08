import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { Reducer } from "react";
import { RootState } from "../../store";
import { selectStyle } from "../style/styleSlice";

// Define a type for the slice state
export interface Table {
  [key: CellName]: Cell;
}

export type CellName = `${number},${number}`;

interface Cell {
  content: string;
  style: React.CSSProperties;
}

export const initialCellState = { content: "", style: {} };

// Define the initial state using that type
export const initialState: Table = {};

export const tableSlice = createSlice({
  name: "table",
  // `tableSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    init: (state, action: PayloadAction<{ rows: number; columns: number }>) => {
      const newState = { ...initialState };
      for (let r = 0; r < action.payload.rows; r++) {
        for (let c = 0; c < action.payload.columns; c++) {
          newState[`${r},${c}`] = initialCellState;
        }
      }
      return newState;
    },
    reset: (state) => {
      Object.keys(state).forEach(
        (cell) => (state[cell as any] = { ...initialCellState })
      );
    },
    overwrite: (state, action: PayloadAction<Table>) => action.payload,
    deleteCellContent: (
      state,
      action: PayloadAction<CellName | CellName[]>
    ) => {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((cellname) => {
          if (!state[cellname]) return;
          if (Object.keys(state[cellname].style).length === 0) {
            delete state[cellname];
          } else {
            state[cellname].content = "";
          }
        });
      } else {
        if (!state[action.payload]) return;
        if (Object.keys(state[action.payload].style).length === 0) {
          delete state[action.payload];
        } else {
          state[action.payload].content = "";
        }
      }
    },
    setCell: (
      state,
      action: PayloadAction<{ cellname: CellName; content: string, style: React.CSSProperties }>
    ) => {
      if (!state[action.payload.cellname])
        state[action.payload.cellname] = { ...initialCellState };

      state[action.payload.cellname].content = action.payload.content;
      state[action.payload.cellname].style = {...state[action.payload.cellname].style,...action.payload.style}
    },
    setCellContent: (
      state,
      action: PayloadAction<{ cellname: CellName; content: string }[] |{ cellname: CellName; content: string }>
    ) => {
      if (Array.isArray(action.payload)){
       action.payload.forEach(payload => {
        if (!state[payload.cellname])
        state[payload.cellname] = { ...initialCellState };

      state[payload.cellname].content = payload.content
       } ) 

        }
      else {
      if (!state[action.payload.cellname])
        state[action.payload.cellname] = { ...initialCellState };

      state[action.payload.cellname].content = action.payload.content;
    }},
    setCellStyle: (
      state,
      action: PayloadAction<{ cellname: CellName; style: React.CSSProperties }>
    ) => {
      /* YOu need to do it like that if you dont use Immer: https://immerjs.github.io/immer/
      const newState = {
        ...state,
        [action.payload.cellname]: {
          ...state[action.payload.cellname],
          style: action.payload.style,
        },
      };
      return newState; */

      //Simple way with Immer
      if (!state[action.payload.cellname])
        state[action.payload.cellname] = { ...initialCellState };
      state[action.payload.cellname].style = action.payload.style;
    },
    mergeCellStyle: (
      state,
      action: PayloadAction<{
        cellname: CellName | CellName[];
        style: React.CSSProperties;
      }>
    ) => {
      if (Array.isArray(action.payload.cellname)) {
        action.payload.cellname.forEach((cellname) => {
          if (!state[cellname]) state[cellname] = { ...initialCellState };
          state[cellname].style = {
            ...state[cellname].style,
            ...action.payload.style,
          };
        });
      } else {
        if (!state[action.payload.cellname])
          state[action.payload.cellname] = { ...initialCellState };
        state[action.payload.cellname].style = {
          ...state[action.payload.cellname].style,
          ...action.payload.style,
        };
      }
    },
  },
});

export const {
  init,
  overwrite,
  setCellStyle,
  mergeCellStyle,
  reset,
  deleteCellContent,
  setCellContent,
} = tableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCell = (cellName: CellName) => (state: RootState) =>
  state.table.present[cellName]
    ? state.table.present[cellName]
    : initialCellState;
export const selectPresentTable = (state: RootState) => state.table.present;

export default tableSlice.reducer;
