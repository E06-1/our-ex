import React from "react";
import "./App.css";
import EditingBar from "./components/EditingbBar/EditingBar";
import ActionBar from "./components/ActionBar/ActionBar";
import Grid from "./components/Grid/Grid";
import { useAppDispatch } from "./store";
import { mergeCellStyle, setCellStyle } from "./features/table/tableSlice";

function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <input
        type="button"
        value="Style Cell"
        onClick={() =>
          dispatch(
            setCellStyle({ cellname: "0,0", style: { backgroundColor: "red" } })
          )
        }
      />
      <input
        type="button"
        value="Merge Style Cell"
        onClick={() =>
          dispatch(
            mergeCellStyle({ cellname: "0,0", style: { border: "4px solid green" } })
          )
        }
      />
      <EditingBar />
      <ActionBar />
      <Grid rows={10} columns={10} />
    </div>
  );
}

export default App;
