import styled from "styled-components";
import { crossIcon, saveIcon, trashIcon } from "../assets/svg_icons";
import TaskStatusSelection from "./inputs/TaskStatusSelection";
import ToolbarBtn from "./styled/ToolbarBtn";

const TaskDetailsToolbarStyled = styled.ul`
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  padding: 0 10px;
  border: 0px solid #f3f3f3;
  border-width: 2px 0px 2px 2px;
  border-radius: 0 0 0 20px;
  background-color: #fefefe;
`;
TaskDetailsToolbarStyled.displayName = "TaskDetailsToolbarStyled";

const TaskStatusWrapper = styled.li`
  display: flex;
  justify-content: center;
`;
TaskStatusWrapper.displayName = "TaskStatusWrapper";

export default function TaskDetailsToolbar({
  newTask,
  isTaskFormDirty,
  removeTask,
  showTaskDetailsLeavePanel,
  hideTaskDetails,
  taskStatusRegister,
}) {
  return (
    <TaskDetailsToolbarStyled>
      {newTask ? null : (
        <>
          <li>
            <ToolbarBtn onClick={removeTask}>{trashIcon}</ToolbarBtn>
          </li>
          <TaskStatusWrapper>
            <TaskStatusSelection register={taskStatusRegister} />
          </TaskStatusWrapper>
          <li>
            <ToolbarBtn type="submit">{saveIcon}</ToolbarBtn>
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
