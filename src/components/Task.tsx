import styled from "styled-components";
import TaskDetails from "./TaskDetails";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { calendarEventIcon, personIcon, taskIcon } from "../assets/svg_icons";

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

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #f3f3f3;

  > li {
    margin-right: 20px;
    height: 20px;
    display: flex;
    gap: 5px;
  }
`;
Container.displayName = "Container";

const Title = styled.li`
  width: 100%;
  font-weight: 600;
  margin-bottom: 10px;
`;
Title.displayName = "Title";

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
      <Container ref={drag} onClick={() => setTaskDetailsShown(true)}>
        <Title>{title}</Title>
        {deadline ? (
          <li>
            {calendarEventIcon} {deadline}
          </li>
        ) : null}
        {assigneesList ? (
          <li>
            {personIcon}
            {assigneesList.length}
            {assigneesLimit ? `/ ${assigneesLimit}` : ""}
          </li>
        ) : null}
        {status ? (
          <li>
            {taskIcon} {status}
          </li>
        ) : null}
      </Container>
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
