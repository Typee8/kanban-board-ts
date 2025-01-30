import styled from "styled-components";
import Board from "./Board";
import BoardSettings from "./BoardSettings";
import MenuBoardPanel from "./MenuBoardPanel";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { useState } from "react";

const BoardPanelStyled = styled.div`
  width: 100vw;
  height: 60vh;
`;

BoardPanelStyled.displayName = "BoardPanelStyled";

export default function BoardPanel() {
  const [boardSettingShown, setBoardSettingShown] = useState(false);

  return (
    <DndProvider options={HTML5toTouch}>
      <BoardPanelStyled>
        <MenuBoardPanel
          boardSettingShown={boardSettingShown}
          setBoardSettingShown={setBoardSettingShown}
        />
        <Board />
        {boardSettingShown ? <BoardSettings /> : null}
      </BoardPanelStyled>
    </DndProvider>
  );
}
