import styled from "styled-components";
import Board from "./Board";
import BoardSettings from "./BoardSettings";
import MenuBoardPanel from "./MenuBoardPanel";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { useState, useEffect } from "react";
import { fetchInitialState } from "../store/slices/boardStateSlice";
import { useDispatch, useSelector } from "react-redux";

const BoardPanelStyled = styled.div`
  width: 100vw;
  height: 60vh;
`;

BoardPanelStyled.displayName = "BoardPanelStyled";

export default function BoardPanel() {
  const [boardSettingShown, setBoardSettingShown] = useState(false);

  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.boardState);
  console.log(data);

  useEffect(() => {
    dispatch(fetchInitialState());
  }, [dispatch]);

  return (
    <DndProvider options={HTML5toTouch}>
      <BoardPanelStyled>
        <MenuBoardPanel
          boardSettingShown={boardSettingShown}
          setBoardSettingShown={setBoardSettingShown}
        />
        {loading ? <h3>Loading...</h3> : <Board boardData={data} />}
        {boardSettingShown ? <BoardSettings /> : null}
      </BoardPanelStyled>
    </DndProvider>
  );
}
