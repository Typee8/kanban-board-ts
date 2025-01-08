import { useState } from "react";
import styled from "styled-components";
import SettingsBtn from "./buttons/SettingsBtn";
import TaskForm from "./forms/TaskForm";

const TaskCardStyled = styled.li`
  padding: 20px;
  border-top: 1px solid black;
`;

const TaskCardContainerStyled = styled.div`
  padding: 20px;
  border-radius: 60px;
  background-color: blanchedalmond;
`;

export default function TaskCard({ data }) {
  const [taskFormShown, setTaskFormShown] = useState(false);
  const { title } = data;

  return (
    <TaskCardStyled>
      <SettingsBtn onClick={() => setTaskFormShown(true)} />
      <TaskCardContainerStyled>
        <h2>{title}</h2>
      </TaskCardContainerStyled>
      <TaskForm
        taskFormShown={taskFormShown}
        setTaskFormShown={() => setTaskFormShown(false)}
      />
    </TaskCardStyled>
  );
}
