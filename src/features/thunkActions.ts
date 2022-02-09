import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectStyle } from "./style/styleSlice";
import { CellName } from "./table/tableSlice";
import { setCell } from "./table/tableSlice";


export const setCellContentWithRemeberedStyle = (payload: {
    cellname: CellName;
    content: string;
  }): ThunkAction<void, RootState, null, AnyAction> => (dispatch, getState) => { 
    const style = selectStyle(getState())
   
    dispatch(setCell({content:payload.content, cellname: payload.cellname, style}))
  };