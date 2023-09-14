import React from 'react';
import './App.css';
import SideBar from './components/sidebar';
import NavBar from './components/navbar';
import AddNewPairNew from './components/addNewPairNew';
import AddNewPairExisting from './components/addNewPairExisting';
import AddNewPair from './components/addNewPair';


function App() {
  return (
      <div className="App-body">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="add-new-pair">
          {/* <AddNewPairExisting /> */}
          <AddNewPairNew />
        </div>
      </div>
  );
}

export default App;
