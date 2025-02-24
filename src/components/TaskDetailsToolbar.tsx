import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import SelectFluid from "./inputs/SelectFluid";

const TaskDetailsToolbarStyled = styled.ul`
  position: absolute;
  right: 40px;
`;

export default function TaskDetailsToolbar({
  isTaskFormDirty,
  removeTask,
  showTaskDetailsLeavePanel,
  hideTaskDetails,
  getTaskStatus,
  taskStatusRegister,
}) {
  return (
    <TaskDetailsToolbarStyled>
      <li>
        <SelectFluid
          getSelectValue={getTaskStatus}
          register={taskStatusRegister}
          selectOptions={["in progress", "needs review", "done"]}
        />
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
