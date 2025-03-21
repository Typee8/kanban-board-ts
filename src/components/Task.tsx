import styled from "styled-components";
import TaskDetails from "./TaskDetails";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { calendarEventIcon, personIcon, taskIcon } from "../assets/svg_icons";
import { tablet } from "../devicesWidthStandard";

export const TaskStyled = styled.li`
  padding: 10px 20px;
  opacity: ${(props) => {
    if (props.$isDragging) return 0;
    if (props.$isPreviewed) return 0.4;
    return 1;
  }};

  &:not(:last-child) {
    border-bottom: 2px solid var(--primary-color);
  }
`;
TaskStyled.displayName = "TaskStyled";

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  border-radius: 10px;
  color: var(--contrast-primary-color);
  background-color: var(--primary-color);

  @media (min-width: ${`${tablet}px`}) {
    flex-direction: column;
  }
`;
Container.displayName = "Container";

const Title = styled.li`
  width: 100%;
  font-weight: 600;
  margin-bottom: 10px;

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-default-size) * var(--font-tablet-scale));
  }
`;
Title.displayName = "Title";

const TaskData = styled.li`
  --height: 20px;
  --font-size: 14px;
  margin-right: 20px;
  height: var(--height);
  font-size: var(--font-size);
  display: flex;
  gap: 5px;

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-size) * var(--font-tablet-scale));
    height: calc(var(--height) * var(--font-tablet-scale));
  }
`;
TaskData.displayName = "TaskData";

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
          <TaskData>
            {calendarEventIcon} {deadline}
          </TaskData>
        ) : null}
        {assigneesList ? (
          <TaskData>
            {personIcon}
            {assigneesList.length}
            {assigneesLimit ? `/ ${assigneesLimit}` : ""}
          </TaskData>
        ) : null}
        {status ? (
          <TaskData>
            {taskIcon} {status}
          </TaskData>
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
