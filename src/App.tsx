import SetupPanel from "./components/SetupPanel";
import BoardPanel from "./components/BoardPanel";
import "./css/reset.css";
import "./css/global.css";
import "./css/fonts.css";
import { HashRouter as Router, Routes, Route } from "react-router";
import { fetchData, setData, removeEverything } from "./server/FirebaseAPI";
import { useState } from "react";
import ThemeContext from "./ThemeContext";

deleteDeprecatedData();

function App() {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  console.log(theme);

  document.documentElement.setAttribute("data-theme", "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<SetupPanel />} />
          <Route path="/board-panel" element={<BoardPanel />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
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
