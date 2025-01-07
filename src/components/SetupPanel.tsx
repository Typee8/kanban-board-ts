import Menu from "./Menu";
import BoardCard from "./BoardCard";
import "../css/SetupPanel.css";

export default function SetupPanel() {
  return (
    <main className="setup-panel">
      <Menu />
      <div className="setup-panel__container">
        <BoardCard />
        <div>
          <button>+</button>
        </div>
      </div>
    </main>
  );
}
