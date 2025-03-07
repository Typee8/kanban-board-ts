import styled from "styled-components";
import Board from "./Board";
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
  const dispatch = useDispatch();
  const { loading, boardId, data } = useSelector((state) => state.boardState);

  useEffect(() => {
    dispatch(fetchInitialState(boardId));
  }, [dispatch]);

  return (
    <DndProvider options={HTML5toTouch}>
      <BoardPanelStyled>
        <MenuBoardPanel />
        {loading ? <h3>Loading...</h3> : <Board boardData={data} />}
      </BoardPanelStyled>
    </DndProvider>
  );
}
