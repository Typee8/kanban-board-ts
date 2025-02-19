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
}) {
  return (
    <TaskDetailsToolbarStyled>
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
