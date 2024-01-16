import "./App.css";
import DashboardPage from "./components/pages/DashboardPage";
import PatientsPage from "./components/pages/PatientsPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import PredictPage from "./components/pages/PredictPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { PatientProvider } from "./context/patientsPageContext";

function PatientContextLayout() {
  return (
    <PatientProvider>
      <Outlet />
    </PatientProvider>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PatientContextLayout />}>
            <Route path="/patients" Component={PatientsPage} />
            <Route path="/" Component={DashboardPage} />
          </Route>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />

          <Route path="/predict" Component={PredictPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
