import styled from "styled-components";
import SettingsBtn from "./buttons/SettingsBtn";
import TaskDetails from "./TaskDetails";
import { useState } from "react";
import { useDrag } from "react-dnd";

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
  taskData,
  className,
  isPreviewed = false,
}) {
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {
      stageId,
      taskId: taskData.id,
      taskData: taskData,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const { title } = taskData;

  return (
    <TaskStyled
      ref={drag}
      className={className}
      $isDragging={isDragging}
      $isPreviewed={isPreviewed}
    >
      <SettingsBtn onClick={() => setTaskDetailsShown(true)} />
      <TaskContainerStyled>
        <h2>{title}</h2>
      </TaskContainerStyled>
      <TaskDetails
        stageId={stageId}
        taskData={taskData}
        taskDetailsShown={taskDetailsShown}
        setTaskDetailsShown={() => setTaskDetailsShown(false)}
      />
    </TaskStyled>
  );
}
