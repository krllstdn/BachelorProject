import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './components/sidebar';
import NavBar from './components/navbar';
import AddNewPair from './components/addNewPair';

function App() {
  return (
      <body className="App-body">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="add-new-pair">
          <AddNewPair />
        </div>
      </body>
  );
}

export default App;
