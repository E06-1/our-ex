import React from 'react';
import './App.css';
import EditingBar from './components/EditingbBar/EditingBar';
import ActionBar from './components/ActionBar/ActionBar';
import  Search  from './components/Search/Search';



function App() {
  return (
    <div className="App">
     
      <ActionBar/> 
      <EditingBar />
      <Search />
    </div>
  );
}

export default App;
