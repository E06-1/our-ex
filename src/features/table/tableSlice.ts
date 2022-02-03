import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { Reducer } from "react";
import type { RootState } from "../../store";

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
    init: (
      state,
      action: PayloadAction<{ rows: number; columns: number }>
    ) => {
      const newState = { ...initialState };
      for (let r = 0; r < action.payload.rows; r++) {
        for (let c = 0; c < action.payload.columns; c++) {
          newState[`${r},${c}`] = initialCellState;
        }
      }
      return newState;
    },
    overwrite: (state, action: PayloadAction<Table>) => action.payload,
    setCellContent: (
      state,
      action: PayloadAction<{ cellname: CellName; content: string }>
    ) => {
      state[action.payload.cellname].content = action.payload.content;
    },
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
      state[action.payload.cellname].style = action.payload.style;
    },
    mergeCellStyle: (
      state,
      action: PayloadAction<{ cellname: CellName; style: React.CSSProperties }>
    ) => {
      state[action.payload.cellname].style = {
        ...state[action.payload.cellname].style,
        ...action.payload.style,
      };
    },
  },
});


export const { init, overwrite, setCellStyle, mergeCellStyle, setCellContent } =
  tableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCell = (cellName: CellName) => (state: RootState) =>
  state.table.present[cellName];
export const selectTable = (state: RootState) => state.table;

export default tableSlice.reducer;
