import { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import SettingsBtn from "./buttons/SettingsBtn";
import TaskSettings from "./TaskSettings";

const TaskStyled = styled.li`
  padding: 20px;
  border-top: 1px solid black;
  opacity: ${(props) => {
    if (props.$isDragging) return 0;
    if (props.$isPreviewed) return 0.4;
    return 1;
  }};
`;

TaskStyled.displayName = "TaskStyled";

const TaskContainerStyled = styled.div`
  padding: 20px;
  border-radius: 60px;
  background-color: blanchedalmond;
`;

TaskContainerStyled.displayName = "TaskContainerStyled";

export default function Task({
  stageId,
  data,
  className,
  isPreviewed = false,
}) {
  const [taskSettingsShown, setTaskSettingsShown] = useState(false);
  const taskRef = useRef();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {
      stageId,
      taskId: data.id,
      taskData: data,
      taskRef,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const { title } = data;

  const taskRefsCombined = (node) => {
    taskRef.current = node;
    drag(node);
  };

  return (
    <TaskStyled
      $isDragging={isDragging}
      $isPreviewed={isPreviewed}
      ref={taskRefsCombined}
      className={className}
    >
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
