import SetupPanel from "./components/SetupPanel";
import AccountManager from "./components/AccountManager";
import Team from "./components/Team";
import LoginScreen from "./components/LoginScreen";
import BoardPanel from "./components/BoardPanel";
import "./css/reset.css";
import { HashRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetupPanel />} />
        <Route path="/account-manager" element={<AccountManager />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/board-panel" element={<BoardPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
