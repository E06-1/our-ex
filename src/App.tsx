import React from "react";
import "./App.css";
import EditingBar from "./components/EditingbBar/EditingBar";
import ActionBar from "./components/ActionBar/ActionBar";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
function App() {
 
  return (
    <div className="App">
      <div style={{position: "sticky", top:"0", backgroundColor: "white", zIndex: "1"}}>
        <header className="header" >
      <Header/>
      <ActionBar />
     
      </header>  
      <EditingBar />
      </div>
      <Grid rows={100} columns={30} />
    </div>
  );
}

export default App;
