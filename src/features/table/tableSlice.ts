import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

// Define a type for the slice state
export interface Table {
  [key:CellName]: Cell
}

export type CellName = `${number},${number}`

interface Cell {
    content: string;
    style: React.CSSProperties;
}

// Define the initial state using that type
export const initialState: Table = {}

export const tableSlice = createSlice({
  name: 'table',
  // `tableSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      reset: (state) => initialState,
      overwrite: (state, action: PayloadAction<Table>) => action.payload 
  },
})

export const {reset, overwrite} = tableSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCell = (cellName: CellName) => (state: RootState) => state.table[cellName]

export default tableSlice.reducer