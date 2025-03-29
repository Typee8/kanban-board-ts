import styled from "styled-components";
import TaskDetails from "./TaskDetails";
import { useState, useRef } from "react";
import { calendarEventIcon, personIcon, taskIcon } from "../assets/svg_icons";
import { tablet } from "../devicesWidthStandard";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import ButtonStyled from "./styled/ButtonStyled";
import { dragIndicatorIcon } from "../assets/svg_icons";
import { CSS } from "@dnd-kit/utilities";

export const TaskStyled = styled.li`
  touch-action: none !important;
  cursor: pointer;
  padding: 10px 20px;

  &:not(:first-child) {
    border-top: 2px solid var(--primary-color);
  }
`;
TaskStyled.displayName = "TaskStyled";

const Container = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 10px;
  border: ${(props) =>
    props.$isDragging
      ? "3px solid var(--contrast-primary-color)"
      : "3px solid transparent"};
  color: var(--contrast-primary-color);
  background-color: var(--primary-color);
  transition: all 0.3s ease;
  border-color: ${(props) =>
    props.$taskStatus === "done"
      ? "var(--highlight-tertiary-color)"
      : props.$taskStatus === "needs review" &&
        "var(--highlight-secondary-color)"};

  @media (min-width: ${`${tablet}px`}) {
    flex-direction: column;

    &:hover {
      & * {
        color: var(--secondary-color);
      }

      background-color: var(--contrast-primary-color);
    }
  }
`;
Container.displayName = "Container";

const Title = styled.li`
  width: 100%;
  padding-right: 20px;
  font-weight: 600;
  word-wrap: break-word;
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

const Drag = styled(ButtonStyled)`
  position: absolute;
  right: 0;
  padding: 0;
  margin-left: auto;
  justify-self: flex-end;
  touch-action: none !important;

  > * {
    width: 30px;
  }

  @media (min-width: ${`${tablet}px`}) {
    &:hover {
      color: unset;
      background-color: unset;
    }
  }
`;
Drag.displayName = "Drag";

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
        $taskStatus={taskData.status}
        style={{ transform: CSS.Translate.toString(transform) }}
        $isDragging={isDragging}
        $isPreviewed={isPreviewed}
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
        <Drag className="stage__drag" {...attributes} {...listeners}>
          {dragIndicatorIcon}
        </Drag>
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
