import ButtonStyled from "./styled/ButtonStyled";
import styled from "styled-components";

const TaskDetailsToolbarStyled = styled.ul`
  position: absolute;
  right: 40px;
`;

export default function TaskDetailsToolbar({
  isTaskFormDirty,
  removeTask,
  showTaskDetailsLeavePanel,
  hideTaskDetails,
  isTaskDone,
  setTaskDone,
}) {
  return (
    <TaskDetailsToolbarStyled>
      <li>
        {isTaskDone() ? (
          <ButtonStyled onClick={() => setTaskDone(false)}>
            Mark as incomplete
          </ButtonStyled>
        ) : (
          <ButtonStyled onClick={() => setTaskDone(true)}>
            Mark as complete
          </ButtonStyled>
        )}
      </li>
      <li>
        <ButtonStyled onClick={removeTask}>Delete Task</ButtonStyled>
      </li>
      <li>
        <ButtonStyled
          onClick={() => {
            if (isTaskFormDirty) {
              showTaskDetailsLeavePanel();
            } else {
              hideTaskDetails();
            }
          }}
        >
          X
        </ButtonStyled>
      </li>
    </TaskDetailsToolbarStyled>
  );
}
