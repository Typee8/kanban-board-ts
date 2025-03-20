import styled from "styled-components";
import Board from "./Board";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { useEffect } from "react";
import { fetchInitialState, fetchState } from "../store/slices/boardStateSlice";
import { useDispatch, useSelector } from "react-redux";
import { reactIcon } from "../assets/svg_icons";

const options = {
  backends: HTML5toTouch.backends,
};
options.backends[1]["options"]["delay"] = 400;
options.backends[1]["options"]["ignoreContextMenu"] = true;

const BoardPanelStyled = styled.div`
  width: 100%;
  height: 100vh;
`;
BoardPanelStyled.displayName = "BoardPanelStyled";

const LoadingScreen = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  padding-top: 40vh;
  background-color: #f3f3f3;
`;
LoadingScreen.displayName = "LoadingScreen";

const LoadingIconContainer = styled.div`
  width: 80px;
  color: #1b1b1b;

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  > * {
    animation: logo-spin infinite 2.5s linear;
  }
`;
LoadingIconContainer.displayName = "LoadingIconContainer";

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
        {loading ? (
          <LoadingScreen>
            <LoadingIconContainer>{reactIcon}</LoadingIconContainer>
          </LoadingScreen>
        ) : (
          <Board boardData={data} />
        )}
      </BoardPanelStyled>
    </DndProvider>
  );
}
