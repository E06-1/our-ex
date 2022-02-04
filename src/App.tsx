import React from "react";
import "./App.css";
import EditingBar from "./components/EditingbBar/EditingBar";
import ActionBar from "./components/ActionBar/ActionBar";
import Grid from "./components/Grid/Grid";
import { useAppDispatch } from "./store";
import { mergeCellStyle, setCellStyle } from "./features/table/tableSlice";
import { useSelector } from "react-redux";
import { selectSelectedCellNames } from "./features/selected/selectedSlice";
import  Search  from "./components/Search/Search";
function App() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCellNames);

  return (
    <div className="App">
      {/* Example Buttons on how to set a Style on a single Cell. 
      If selectedCells contains more than one cell, you need to iterate over them with for each */}
      <input
        type="button"
        value="Override: Background Red"
        onClick={() =>
          dispatch(
            //setCellStyle overwrites all Styles (for example good for resetting)
            setCellStyle({
              cellname: selectedCells[0],
              style: { backgroundColor: "red" },
            })
          )
        }
      />
      <input
        type="button"
        value="Merge: Border Green"
        onClick={() =>
          dispatch(
            //mergeCellStyle keeps the old Styles and overwrites the keys you specify
            mergeCellStyle({
              cellname: selectedCells[0],
              style: { border: "4px solid green" },
            })
          )
        }
      />

      {/* Example on how to color all selected Cells */}
      <input
        type="button"
        value="SetAll: Background Green"
        onClick={() =>
          selectedCells.forEach((cellname) =>
            dispatch(
              setCellStyle({
                cellname,
                style: { background: "green" },
              })
            )
          )
        }
      /> 
      <ActionBar />
      <EditingBar />
      <Search />
      <Grid rows={10} columns={10} />
    </div>
  );
}

export default App;
