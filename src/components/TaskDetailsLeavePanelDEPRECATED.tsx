import ButtonStyled from "./styled/ButtonStyled";
import styled from "styled-components";

const TaskDetailsLeavePanelStyled = styled.div`
  position: absolute;
  top: 200px;
  display: ${(props) => (props.$isShown ? "flex" : "none")};
  flex-direction: column;
  align-items: start;
  gap: 20px;
  padding: 20px 60px;
  border-radius: 20px;
  background-color: #d5922d;
`;
TaskDetailsLeavePanelStyled.displayName = "TaskDetailsLeavePanelStyled";

const TaskDetailsLeavePanelContainerStyled = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  width: 100%;
`;

TaskDetailsLeavePanelContainerStyled.displayName =
  "TaskDetailsLeavePanelContainerStyled";

const CloseBtnStyled = styled(ButtonStyled)`
  align-self: flex-end;
`;

CloseBtnStyled.displayName = "CloseBtnStyled";

export default function TaskDetailsLeavePanel({
  isShown,
  setIsShown,
  closeTaskDetails,
  resetTaskForm,
}) {
  return (
    <TaskDetailsLeavePanelStyled $isShown={isShown}>
      <CloseBtnStyled onClick={() => setIsShown(false)}>X</CloseBtnStyled>
      <h3>You didn't save this task, what would you like to do?</h3>
      <TaskDetailsLeavePanelContainerStyled>
        <input type="submit" value="save" />
        <ButtonStyled
          onClick={() => {
            setIsShown(false);
            closeTaskDetails();
            resetTaskForm();
          }}
        >
          Leave
        </ButtonStyled>
      </TaskDetailsLeavePanelContainerStyled>
    </TaskDetailsLeavePanelStyled>
  );
}
