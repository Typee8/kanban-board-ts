import styled from "styled-components";
import Board from "./Board";
import MenuBoardPanel from "./MenuBoardPanel";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { useState, useEffect } from "react";
import {
  fetchInitialState,
  updateState,
} from "../store/slices/boardStateSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../server/FirebaseAPI";

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
  }, []);

  setTimeout(async () => {
    const serverData = await fetchData(boardId);
    dispatch(updateState(serverData));
  }, 5000);

  return (
    <DndProvider options={HTML5toTouch}>
      <BoardPanelStyled>
        <MenuBoardPanel />
        {loading ? <h3>Loading...</h3> : <Board boardData={data} />}
      </BoardPanelStyled>
    </DndProvider>
  );
}

/* function compareBoardData(serverState, appState) {
  if (!Array.isArray(serverState) && !Array.isArray(appState)) {
    const serverKeys = Object.keys(serverState);
    const appKeys = Object.keys(appState);

    if (serverKeys.length !== appKeys.length) return false;

    for (let i = 0; i < serverKeys.length; i++) {
      if (serverState[serverKeys[i]] !== appState[serverKeys[i]]) return false;
    }

    return true;
  }
}
 */
