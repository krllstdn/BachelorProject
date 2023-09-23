import "./App.css";
import DashboardPage from "./components/pages/DashboardPage";
import PatientsPage from "./components/pages/PatientsPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/patients" Component={PatientsPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />

          <Route path="/" Component={DashboardPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
