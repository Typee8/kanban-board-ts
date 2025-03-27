import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import { TaskStyled } from "./Task";
import { taskAddIcon } from "../assets/svg_icons";
import TaskDetails from "./TaskDetails";
import { useState } from "react";
import { tablet } from "../devicesWidthStandard";

const NewTaskPanelStyled = styled(TaskStyled)`
  display: none;

  &:not(:first-child) {
    border-top: 2px solid var(--primary-color);
  }

  @media (min-width: ${`${tablet}px`}) {
    display: flex;
  }
`;

const Btn = styled(ButtonStyled)`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  color: var(--contrast-primary-color);
  background-color: var(--primary-color);
  font-size: 24px;
`;
Btn.displayName = "Btn";

const IconContainer = styled.div`
  width: 40px;
`;
IconContainer.displayName = "IconContainer";

export default function NewTaskPanel({ disabled = false }) {
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);

  return (
    <NewTaskPanelStyled>
      <Btn disabled={disabled} onClick={() => setTaskDetailsShown(true)}>
        <IconContainer>{taskAddIcon}</IconContainer>
      </Btn>
      {taskDetailsShown ? (
        <TaskDetails hideTaskDetails={() => setTaskDetailsShown()} />
      ) : null}
    </NewTaskPanelStyled>
  );
}
