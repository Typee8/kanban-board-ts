import { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import BoardSettings from "./BoardSettings";
import MenuBoardPanel from "./MenuBoardPanel";

const BoardPanelStyled = styled.div`
  width: 100vw;
  height: 60vh;
`;

BoardPanelStyled.displayName = "BoardPanelStyled";

export default function BoardPanel() {
  const [boardSettingShown, setBoardSettingShown] = useState(false);

  return (
    <BoardPanelStyled>
      <MenuBoardPanel
        boardSettingShown={boardSettingShown}
        setBoardSettingShown={setBoardSettingShown}
      />
      <Board />
      {boardSettingShown ? <BoardSettings /> : null}
    </BoardPanelStyled>
  );
}
