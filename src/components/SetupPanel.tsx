import styled from "styled-components";
import { setData } from "../server/FirebaseAPI";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { setBoardId } from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import ButtonStyled from "./styled/ButtonStyled";
import { tablet } from "../devicesWidthStandard";
import OpenBoardForm from "./forms/OpenBoardForm";

const SetupPanelStyled = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
`;

SetupPanelStyled.displayName = "SetupPanelStyled";

const Title = styled.h2`
  --font-size: calc(24px + 5vw);
  font-size: var(--font-size);
  font-weight: 600;
  margin-top: 100px;
  color: var(--contrast-primary-color);

  @media (min-width: ${{ tablet }}) {
    font-size: calc(var(--font-size) * var(--font-tablet-scale));
  }
`;
Title.displayName = "Title";

const SetupPanelButton = styled(ButtonStyled)`
  --font-size: calc(16px + 1vw);
  min-width: 150px;
  min-height: 60px;
  padding: 30px;
  font-size: var(--font-size);
  background-color: var(--secondary-color);
`;
SetupPanelButton.displayName = "SetupPanelButton";

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const BoardId = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 200px;
  padding: 20px;
  background-color: gray;
  border-radius: 20px;
  font-size: 32px;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  padding: 10px;
  border-radius: 30px;
  background-color: #2d2d2d;
  text-decoration: none;
`;

const newKanbanBoard = [
  { title: "Queue", id: "firstStage" },
  { title: "In progress", id: "1" },
  { title: "Done", id: "lastStage" },
];

export default function SetupPanel() {
  const [boardIdShown, setBoardIdShown] = useState(false);
  const [formShown, setFormShown] = useState(false);
  const [providedBoardId, setProvidedBoardId] = useState("");
  const [currentBoardId, setCurrentBoardId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <SetupPanelStyled>
      <Title>Kanban Board</Title>
      <Container>
        <SetupPanelButton onClick={() => setFormShown(true)}>
          Open your board
        </SetupPanelButton>
        <SetupPanelButton
          onClick={async () => {
            const id = uuidv4();
            await setData(newKanbanBoard, id);
            dispatch(setBoardId(id));
            setCurrentBoardId(id);
            sessionStorage.setItem("boardId", id);
            setBoardIdShown(true);
          }}
        >
          Create new board
        </SetupPanelButton>
      </Container>

      {formShown ? (
        <OpenBoardForm closeForm={() => setFormShown(false)} />
      ) : /*         <Form
          onSubmit={(evt) => {
            evt.preventDefault();
            dispatch(setBoardId(providedBoardId));
            sessionStorage.setItem("boardId", providedBoardId);
            navigate("/board-panel");
          }}
          closeForm={() => setFormShown(false)}
        >
          <input
            value={providedBoardId}
            onChange={(evt) => setProvidedBoardId(evt.target.value)}
          />
        </Form> */
      null}

      {boardIdShown ? (
        <BoardId>
          {currentBoardId}
          <NavLinkStyled to="/board-panel">{">"}</NavLinkStyled>
        </BoardId>
      ) : null}
    </SetupPanelStyled>
  );
}
