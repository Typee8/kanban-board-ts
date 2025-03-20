import styled from "styled-components";
import Board from "./Board";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { useEffect } from "react";
import { fetchInitialState, fetchState } from "../store/slices/boardStateSlice";
import { useDispatch, useSelector } from "react-redux";

const BoardPanelStyled = styled.div`
  width: 100%;
  height: 60vh;
`;

BoardPanelStyled.displayName = "BoardPanelStyled";

const options = {
  backends: HTML5toTouch.backends,
};
options.backends[1]["options"]["delay"] = 400;
options.backends[1]["options"]["ignoreContextMenu"] = true;

export default function BoardPanel() {
  const dispatch = useDispatch();
  const { loading, boardId, data } = useSelector((state) => state.boardState);

  useEffect(() => {
    dispatch(fetchInitialState(boardId));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchState(boardId));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <DndProvider options={options}>
      <BoardPanelStyled>
        {loading ? <h3>Loading...</h3> : <Board boardData={data} />}
      </BoardPanelStyled>
    </DndProvider>
  );
}
