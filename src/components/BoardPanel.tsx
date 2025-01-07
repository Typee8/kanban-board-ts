import { useState } from "react";
import Board from "./Board";
import BoardSettings from "./BoardSettings";
import MenuBoardPanel from "./MenuBoardPanel";
import "../css/BoardPanel.css";

export default function BoardPanel() {
  const [boardSettingShown, setBoardSettingShown] = useState(false);

  return (
    <div className="board-panel">
      <MenuBoardPanel
        boardSettingShown={boardSettingShown}
        setBoardSettingShown={setBoardSettingShown}
      />
      <Board />
      {boardSettingShown ? <BoardSettings /> : null}
    </div>
  );
}
