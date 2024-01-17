import "./App.css";
import PredictPage from "./components/pages/PredictPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/predict" Component={PredictPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
