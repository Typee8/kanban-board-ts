import { useState } from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import SettingsBtn from "./buttons/SettingsBtn";
import StageForm from "./forms/StageForm";

const StageStyled = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
`;

export default function Stage({ data }) {
  const [stageFormShown, setStageFormShown] = useState(false);

  const { title, tasksList } = data;
  const tasks = tasksList.map((data) => <TaskCard key={data.ID} data={data} />);
  return (
    <StageStyled className="stage">
      <SettingsBtn
        className="stage__settings"
        onClick={() => setStageFormShown(true)}
      />
      <h2 className="stage__title">{title}</h2>
      <ul className="stage__tasks">{tasks}</ul>
      <StageForm
        stageFormShown={stageFormShown}
        setStageFormShown={() => setStageFormShown(false)}
      />
    </StageStyled>
  );
}
