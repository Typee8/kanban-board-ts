import styled from "styled-components";
import TaskDetails from "./TaskDetails";
import { useState } from "react";
import { useDrag } from "react-dnd";

const TaskStyled = styled.li`
  padding: 10px 20px;
  opacity: ${(props) => {
    if (props.$isDragging) return 0;
    if (props.$isPreviewed) return 0.4;
    return 1;
  }};

  &:not(:last-child) {
    border-bottom: 2px solid #f3f3f3;
  }
`;

TaskStyled.displayName = "TaskStyled";

const TaskContainerStyled = styled.ul`
  padding-inline: 20px;
  border-radius: 60px;
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
  const { title, deadline, assigneesList, assigneesLimit, status } = taskData;

  return (
    <TaskStyled
      className={className}
      $isDragging={isDragging}
      $isPreviewed={isPreviewed}
    >
      <TaskContainerStyled ref={drag} onClick={() => setTaskDetailsShown(true)}>
        <li>{title}</li>
        <li>{deadline}</li>
        <li>
          {assigneesList
            ? `${assigneesList.length} ${
                assigneesLimit ? `/ ${assigneesLimit}` : ""
              }`
            : null}
        </li>
        <li>Task status {status}</li>
      </TaskContainerStyled>
      {taskDetailsShown ? (
        <TaskDetails
          stageId={stageId}
          taskData={taskData}
          setTaskDetailsShown={() => setTaskDetailsShown(false)}
        />
      ) : null}
    </TaskStyled>
  );
}
