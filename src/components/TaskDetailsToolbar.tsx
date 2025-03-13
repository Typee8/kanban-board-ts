import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import { SelectStyled } from "./styled/SelectStyled";
import { crossIcon, trashIcon } from "../assets/svg_icons";
import SelectTaskStatus from "./inputs/SelectTaskStatus";

const TaskDetailsToolbarStyled = styled.ul`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  padding: 0 10px;
  border-radius: 0 0 0 20px;
  background-color: #fefefe;
`;

const ToolbarBtn = styled(ButtonStyled)`
  width: 50px;
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;

const LiStyled = styled.li`
  display: flex;
  justify-content: center;
`;

export default function TaskDetailsToolbar({
  newTask,
  isTaskFormDirty,
  removeTask,
  showTaskDetailsLeavePanel,
  hideTaskDetails,
  getTaskStatus,
  taskStatusRegister,
}) {
  return (
    <TaskDetailsToolbarStyled>
      {newTask ? null : (
        <>
          <LiStyled>
            <SelectTaskStatus register={taskStatusRegister} />
          </LiStyled>
          <li>
            <ToolbarBtn onClick={removeTask}>{trashIcon}</ToolbarBtn>
          </li>
        </>
      )}
      <li>
        <ToolbarBtn
          onClick={() => {
            if (isTaskFormDirty) {
              showTaskDetailsLeavePanel();
            } else {
              hideTaskDetails();
            }
          }}
        >
          {crossIcon}
        </ToolbarBtn>
      </li>
    </TaskDetailsToolbarStyled>
  );
}
