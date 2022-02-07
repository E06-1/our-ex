import React from "react";
import "./App.css";
import EditingBar from "./components/EditingbBar/EditingBar";
import ActionBar from "./components/ActionBar/ActionBar";
import Grid from "./components/Grid/Grid";
import  Search  from "./components/Search/Search";
import { useAppDispatch } from "./store";
import { startAdditionalSelection, stopAdditionalSelection } from "./features/selected/selectedSlice";
function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <header style={{position: "sticky", top:"0", backgroundColor: "white", zIndex: "1"}}>
      <button onClick={() =>dispatch(startAdditionalSelection()) }>Start Additional Selection</button>
      <button onClick={() => dispatch(stopAdditionalSelection())}>Stop Additional Selection</button>
      <ActionBar />
      <EditingBar />
    
      </header>
      
      <Grid rows={100} columns={30} />
    </div>
  );
}

export default App;
