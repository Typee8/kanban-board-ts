import styled from "styled-components";
import { setData } from "../server/FirebaseAPI";
import { v4 as uuidv4 } from "uuid";

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

const newKanbanBoard = [
  { title: "Queue", id: "firstStage" },
  { title: "In progress", id: "1" },
  { title: "Done", id: "lastStage" },
];

export default function SetupPanel() {
  return (
    <SetupPanelStyled>
      <ButtonStyled onClick={() => setData(newKanbanBoard, uuidv4())}>
        +
      </ButtonStyled>
    </SetupPanelStyled>
  );
}
