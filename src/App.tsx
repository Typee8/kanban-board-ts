import SetupPanel from "./components/SetupPanel";
import BoardPanel from "./components/BoardPanel";
import "./css/reset.css";
import { HashRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetupPanel />} />
        <Route path="/board-panel" element={<BoardPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
