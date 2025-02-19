import AddBtn from "./buttons/AddBtn";
import TaskDetails from "./TaskDetails";
import StageForm from "./forms/StageForm";
import styled from "styled-components";
import { useState } from "react";

const NewBoardElementsStyled = styled.li`
  display: "flex";
  flex-direction: "column";
`;

NewBoardElementsStyled.displayName = "NewBoardElementsStyled";

export default function NewBoardElements() {
  const [stageFormShown, setStageFormShown] = useState(false);
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);

  return (
    <NewBoardElementsStyled>
      <AddBtn onClick={() => setStageFormShown(true)} />
      <AddBtn onClick={() => setTaskDetailsShown(true)} />
      <StageForm
        stageFormShown={stageFormShown}
        setStageFormShown={() => setStageFormShown(false)}
      />

      <TaskDetails
        taskDetailsShown={taskDetailsShown}
        setTaskDetailsShown={() => setTaskDetailsShown(false)}
      />
    </NewBoardElementsStyled>
  );
}
