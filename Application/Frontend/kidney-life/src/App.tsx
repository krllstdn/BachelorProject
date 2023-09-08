import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './Components/sidebar';
import NavBar from './Components/navbar';

function App() {
  return (
      <body className="App-body">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
      </body>
  );
}

export default App;
