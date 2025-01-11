import { useState } from "react";
import styled from "styled-components";
import SettingsBtn from "./buttons/SettingsBtn";
import TaskSettings from "./TaskSettings";

const TaskStyled = styled.li`
  padding: 20px;
  border-top: 1px solid black;
`;

TaskStyled.displayName = "TaskStyled";

const TaskContainerStyled = styled.div`
  padding: 20px;
  border-radius: 60px;
  background-color: blanchedalmond;
`;

TaskContainerStyled.displayName = "TaskContainerStyled";

export default function Task({ stageId, data }) {
  const [taskSettingsShown, setTaskSettingsShown] = useState(false);
  const { title } = data;

  return (
    <TaskStyled>
      <SettingsBtn onClick={() => setTaskSettingsShown(true)} />
      <TaskContainerStyled>
        <h2>{title}</h2>
      </TaskContainerStyled>
      <TaskSettings
        stageId={stageId}
        data={data}
        taskSettingsShown={taskSettingsShown}
        setTaskSettingsShown={() => setTaskSettingsShown(false)}
      />
    </TaskStyled>
  );
}
