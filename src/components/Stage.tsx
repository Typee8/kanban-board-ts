import { useState } from "react";
import { useDrop } from "react-dnd";
import { moveTask } from "../store/slices/boardStateSlice";
import styled from "styled-components";
import Task from "./Task";
import SettingsBtn from "./buttons/SettingsBtn";
import StageSettings from "./StageSettings";
import { useDispatch } from "react-redux";

const StageStyled = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
`;

StageStyled.displayName = "StageStyled";

export default function Stage({ stageData }) {
  const [stageSettingsShown, setStageSettingsShown] = useState(false);
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (draggedItem) => {
        const currentStageId = draggedItem.stageId;
        const { taskId } = draggedItem;
        onTaskDrop(taskId, currentStageId, stageData.id);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  function onTaskDrop(taskId, currentStageId, newStageId) {
    console.log(
      `OnTaskDrop: taskId:${taskId} currentStageId:${currentStageId} newStageId:${newStageId}`
    );
    // current stage id, taskid
    // stage id where the task is being moved
    // DONE!
    // moveTask() from Slice
    console.log(`OnTaskDrop launched!`);
    dispatch(moveTask({ taskId, currentStageId, newStageId }));
  }

  const { title, tasksList } = stageData;
  const tasks = tasksList.map((data) => (
    <Task key={data.id} stageId={stageData.id} data={data} />
  ));
  return (
    <StageStyled ref={drop} className="stage">
      <SettingsBtn
        className="stage__settings"
        onClick={() => setStageSettingsShown(true)}
      />
      <h2 className="stage__title">{title}</h2>
      <ul className="stage__tasks">{tasks}</ul>
      <StageSettings
        data={stageData}
        stageSettingsShown={stageSettingsShown}
        setStageSettingsShown={() => setStageSettingsShown(false)}
      />
    </StageStyled>
  );
}
