import React from "react";
import "./App.css";
import EditingBar from "./components/EditingbBar/EditingBar";
import ActionBar from "./components/ActionBar/ActionBar";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
function App() {
 
  return (
    <div className="App">
      <header className="header" style={{position: "sticky", top:"0", backgroundColor: "white", zIndex: "1"}}>
      <Header/>
      <ActionBar />
        </header>  
        <EditingBar />
      <Grid rows={100} columns={30} />
    </div>
  );
}

export default App;
