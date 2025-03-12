import TaskDetails from "./TaskDetails";
import styled from "styled-components";
import { useState } from "react";
import AddTaskIcon from "./icons/AddTaskIcon";
import AddStageIcon from "./icons/AddStageIcon";
import LogOffIcon from "./icons/LogOffIcon";
import StageDetails from "./StageDetails";

const NewBoardElementsStyled = styled.li`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: space-around;
  width: 100vw;
  padding: 20px;
  background-color: #fefefe;
`;

NewBoardElementsStyled.displayName = "NewBoardElementsStyled";

export default function NewBoardElements() {
  const [stageDetailsShown, setStageDetailsShown] = useState(false);
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);

  return (
    <NewBoardElementsStyled>
      <LogOffIcon />
      <AddTaskIcon onClick={() => setTaskDetailsShown(true)} />
      <AddStageIcon onClick={() => setStageDetailsShown(true)} />

      {stageDetailsShown ? (
        <StageDetails setStageDetailsShown={setStageDetailsShown} />
      ) : null}

      {taskDetailsShown ? (
        <TaskDetails setTaskDetailsShown={setTaskDetailsShown} />
      ) : null}
    </NewBoardElementsStyled>
  );
}
