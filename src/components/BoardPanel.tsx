import styled from "styled-components";
import { useEffect } from "react";
import { fetchInitialState, fetchState } from "../store/slices/boardStateSlice";
import { useDispatch, useSelector } from "react-redux";
import { reactIcon } from "../assets/svg_icons";
import { useNavigate } from "react-router";
import MenuMobile from "./MenuMobile";
import Board from "./Board";

const BoardPanelStyled = styled.main`
  width: 100vw;
  height: 100vh;
`;
BoardPanelStyled.displayName = "BoardPanelStyled";

const LoadingScreen = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  padding-top: 40vh;
  background-color: var(--primary-color);
`;
LoadingScreen.displayName = "LoadingScreen";

const LoadingIconContainer = styled.div`
  width: 80px;
  color: var(--contrast-primary-color);

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
  const navigate = useNavigate();
  const { loading, boardId, data } = useSelector((state) => state.boardState);

  useEffect(() => {
    if (!boardId) {
      navigate("/");
    } else {
      dispatch(fetchInitialState(boardId));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchState(boardId));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <BoardPanelStyled>
      {loading ? (
        <LoadingScreen>
          <LoadingIconContainer>{reactIcon}</LoadingIconContainer>
        </LoadingScreen>
      ) : (
        <>
          <Board boardData={data} />
          <MenuMobile />
        </>
      )}
    </BoardPanelStyled>
  );
}
