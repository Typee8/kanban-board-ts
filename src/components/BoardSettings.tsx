import "../css/BoardSettings.css";

export default function BoardSettings() {
  return (
    <ul className="board-options">
      <li>
        <button>Delete board</button>
      </li>
      <li>
        Change name
        <input></input>
        <button>submit</button>
      </li>
    </ul>
  );
}
