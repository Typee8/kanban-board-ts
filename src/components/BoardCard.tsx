import { NavLink } from "react-router";
import "../css/BoardCard.css";

export default function BoardCard() {
  return (
    <NavLink to="/board-panel">
      <div className="setup-panel__board-card">
        <div>Name of Kanban Board</div>
      </div>
    </NavLink>
  );
}
