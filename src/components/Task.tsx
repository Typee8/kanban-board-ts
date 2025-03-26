import styled from "styled-components";
import TaskDetails from "./TaskDetails";
import { useState, useRef } from "react";
import { calendarEventIcon, personIcon, taskIcon } from "../assets/svg_icons";
import { tablet } from "../devicesWidthStandard";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const TaskStyled = styled.li`
  &:not(:first-child) {
    border-top: 2px solid var(--primary-color);
  }
  padding: 10px;
`;
TaskStyled.displayName = "TaskStyled";

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  border-radius: 10px;
  border: ${(props) =>
    props.$isDragging
      ? "3px solid var(--contrast-primary-color)"
      : "3px solid transparent"};
  color: var(--contrast-primary-color);
  background-color: var(--primary-color);
  transform: ${(props) => props.$transform};

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

export default function Task({ stageId, taskData, isPreviewed = false }) {
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);
  const taskRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef: dragRef,
    transform,
  } = useDraggable({
    id: taskData.id,
    data: {
      itemType: "task",
      currentStageId: stageId,
      taskId: taskData.id,
      taskData,
      itemRef: taskRef.current,
    },
  });

  useDndMonitor({
    onDragStart: (event) => {
      if (event.active.id === taskData.id) setIsDragging(true);
    },
    onDragEnd: (event) => {
      if (event.active.id === taskData.id) setIsDragging(false);
    },
    onDragCancel: (event) => {
      if (event.active.id === taskData.id) setIsDragging(false);
    },
  });

  const { title, deadline, assigneesList, assigneesLimit, status } = taskData;

  return (
    <TaskStyled ref={taskRef} className={isPreviewed ? null : "task"}>
      <Container
        ref={dragRef}
        $transform={CSS.Translate.toString(transform)}
        $isDragging={isDragging}
        $isPreviewed={isPreviewed}
        {...attributes}
        {...listeners}
        onClick={() => setTaskDetailsShown(true)}
      >
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
          hideTaskDetails={() => setTaskDetailsShown(false)}
        />
      ) : null}
    </TaskStyled>
  );
}
