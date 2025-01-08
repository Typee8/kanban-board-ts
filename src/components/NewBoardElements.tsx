import { useState } from "react";
import AddBtn from "./buttons/AddBtn";
import TaskForm from "./forms/TaskForm";
import StageForm from "./forms/StageForm";
import styled from "styled-components";

const NewBoardElementsStyled = styled.li`
  display: "flex";
  flex-direction: "column";
`;

export default function NewBoardElements() {
  const [stageFormShown, setStageFormShown] = useState(false);
  const [taskFormShown, setTaskFormShown] = useState(false);

  return (
    <NewBoardElementsStyled>
      <AddBtn onClick={() => setStageFormShown(true)} />
      <AddBtn onClick={() => setTaskFormShown(true)} />
      <StageForm
        stageFormShown={stageFormShown}
        setStageFormShown={() => setStageFormShown(false)}
      />
      <TaskForm
        taskFormShown={taskFormShown}
        setTaskFormShown={() => setTaskFormShown(false)}
      />
    </NewBoardElementsStyled>
  );
}
