import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import { crossIcon, saveIcon, trashIcon } from "../assets/svg_icons";
import SelectTaskStatus from "./inputs/SelectTaskStatus";

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
  taskStatusRegister,
}) {
  return (
    <TaskDetailsToolbarStyled>
      {newTask ? null : (
        <>
          <li>
            <ToolbarBtn onClick={removeTask}>{trashIcon}</ToolbarBtn>
          </li>
          <LiStyled>
            <SelectTaskStatus register={taskStatusRegister} />
          </LiStyled>
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
