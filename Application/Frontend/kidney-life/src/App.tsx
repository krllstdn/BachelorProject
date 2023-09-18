import React, { useState } from "react";
import "./App.css";
import DashboardPage from "./components/dashboardPage";
import PatientsPage from "./components/patientsPage";

function App() {
  return (
    <div className="App">
      {/* <DashboardPage /> */}
      <PatientsPage />
    </div>
  );
}

export default App;
