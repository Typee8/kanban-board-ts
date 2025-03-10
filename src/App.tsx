import SetupPanel from "./components/SetupPanel";
import BoardPanel from "./components/BoardPanel";
import "./css/reset.css";
import { HashRouter as Router, Routes, Route } from "react-router";
import { fetchData, setData, removeEverything } from "./server/FirebaseAPI";

function App() {
  deleteDeprecatedData();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetupPanel />} />
        <Route path="/board-panel" element={<BoardPanel />} />
      </Routes>
    </Router>
  );
}

async function deleteDeprecatedData() {
  let appLastConnectionToTheServer = await fetchData(
    "appLastConnectionToTheServer"
  );
  appLastConnectionToTheServer = parseInt(appLastConnectionToTheServer);
  const currentTime = new Date().getTime();
  const timeDifference = Math.abs(currentTime - appLastConnectionToTheServer);

  const oneHour = 3600000;

  if (timeDifference >= oneHour) {
    await removeEverything();
  }

  setData(currentTime, "appLastConnectionToTheServer");
}

export default App;
