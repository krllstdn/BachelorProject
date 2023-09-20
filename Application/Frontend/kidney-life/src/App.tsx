import React, { useState } from "react";
import "./App.css";
import DashboardPage from "./components/dashboardPage";
import PatientsPage from "./components/patientsPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div className="App">
      {/* <DashboardPage /> */}
      {/* <PatientsPage /> */}
      <LoginPage />
    </div>
  );
}

export default App;
