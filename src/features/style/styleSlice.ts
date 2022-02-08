import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../../store";

// Define the initial state using that type
export const initialState: React.CSSProperties = {};

export const styleSlice = createSlice({
  name: "style",
  // `tableSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: () => initialState,
    rememberStyle: (state, action: PayloadAction<React.CSSProperties>) => {
      const newState = { ...state, ...action.payload };
      return newState
    },
  },
});

export const { reset, rememberStyle } = styleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStyle = (state: RootState) => state.style;

export default styleSlice.reducer;
