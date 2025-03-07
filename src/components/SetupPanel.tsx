import styled from "styled-components";
import { setData } from "../server/FirebaseAPI";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { setBoardId } from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import Form from "./forms/Form";

const SetupPanelStyled = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

SetupPanelStyled.displayName = "SetupPanelStyled";

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  background-color: gray;
  border-radius: 20px;
  width: 120px;
  height: 120px;
  font-size: 64px;
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
      <ButtonStyled onClick={() => setFormShown(true)}>*</ButtonStyled>
      {formShown ? (
        <Form
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
        </Form>
      ) : null}

      <ButtonStyled
        onClick={async () => {
          const id = uuidv4();
          await setData(newKanbanBoard, id);
          dispatch(setBoardId(id));
          setCurrentBoardId(id);
          sessionStorage.setItem("boardId", id);
          setBoardIdShown(true);
        }}
      >
        +
      </ButtonStyled>
      {boardIdShown ? (
        <BoardId>
          {currentBoardId}
          <NavLinkStyled to="/board-panel">{">"}</NavLinkStyled>
        </BoardId>
      ) : null}
    </SetupPanelStyled>
  );
}
