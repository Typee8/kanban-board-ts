import TaskDetails from "./TaskDetails";
import styled from "styled-components";
import { useState } from "react";
import StageDetails from "./StageDetails";
import { logOffIcon, stageAddIcon, taskAddIcon } from "../assets/svg_icons";
import { useNavigate } from "react-router";
import ButtonStyled from "./styled/ButtonStyled";

const NewBoardElementsStyled = styled.li`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: space-around;
  width: 100vw;
  padding: 15px;
  background-color: #fefefe;
`;

NewBoardElementsStyled.displayName = "NewBoardElementsStyled";

const NewElementsBtn = styled(ButtonStyled)`
  width: 50px;
  color: #1b1b1b;
  border-radius: 10px;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;

export default function NewBoardElements() {
  const [stageDetailsShown, setStageDetailsShown] = useState(false);
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);
  const navigate = useNavigate();

  return (
    <NewBoardElementsStyled>
      <NewElementsBtn onClick={() => navigate("/")}>
        {logOffIcon}
      </NewElementsBtn>
      <NewElementsBtn onClick={() => setTaskDetailsShown(true)}>
        {taskAddIcon}
      </NewElementsBtn>
      <NewElementsBtn onClick={() => setStageDetailsShown(true)}>
        {stageAddIcon}
      </NewElementsBtn>

      {stageDetailsShown ? (
        <StageDetails setStageDetailsShown={setStageDetailsShown} />
      ) : null}

      {taskDetailsShown ? (
        <TaskDetails setTaskDetailsShown={setTaskDetailsShown} />
      ) : null}
    </NewBoardElementsStyled>
  );
}
