import { useState } from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import SettingsBtn from "./buttons/SettingsBtn";
import StageSettings from "./StageSettings";

const StageStyled = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
`;

StageStyled.displayName = "StageStyled";

export default function Stage({ data }) {
  const [stageSettingsShown, setStageSettingsShown] = useState(false);

  const { title, tasksList } = data;
  const tasks = tasksList.map((data) => <TaskCard key={data.id} data={data} />);
  return (
    <StageStyled className="stage">
      <SettingsBtn
        className="stage__settings"
        onClick={() => setStageSettingsShown(true)}
      />
      <h2 className="stage__title">{title}</h2>
      <ul className="stage__tasks">{tasks}</ul>
      <StageSettings
        data={data}
        stageSettingsShown={stageSettingsShown}
        setStageSettingsShown={() => setStageSettingsShown(false)}
      />
    </StageStyled>
  );
}
