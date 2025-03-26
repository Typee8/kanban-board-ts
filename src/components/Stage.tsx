import styled from "styled-components";
import Task from "./Task";
import StageDetails from "./StageDetails";
import { useState, useRef } from "react";
import StageOverview from "./StageOverview";
import NewTaskPanel from "./NewTaskPanel";
import { tablet } from "../devicesWidthStandard";
import { useDraggable, useDroppable, useDndMonitor } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const StageStyled = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 10px;
  min-width: 250px;
  background-color: var(--secondary-color);
  border: ${(props) =>
    props.$isDragging
      ? "3px solid var(--contrast-primary-color)"
      : "3px solid transparent"};
  touch-action: none !important;

  @media (min-width: ${`${tablet}px`}) {
    max-width: 33vw;
  }
`;
StageStyled.displayName = "StageStyled";

const TasksList = styled.ul`
  display: ${(props) => (props.$isShown ? "initial" : "none")};

  @media (min-width: ${`${tablet}px`}) {
    display: initial;
  }
`;
TasksList.displayName = "TasksList";

export default function Stage({ stageData, isPreviewed = false }) {
  const [stageDetailsShown, setStageDetailsShown] = useState(false);
  const [stageTasksShown, setStageTasksShown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef();

  const {
    attributes,
    listeners,
    setNodeRef: dragRef,
    transform,
  } = useDraggable({
    id: stageData.id,
    data: {
      itemType: "stage",
      stageId: stageData.id,
    },
  });

  useDndMonitor({
    onDragStart: (event) => {
      if (event.active.id === stageData.id) setIsDragging(true);
    },
    onDragEnd: (event) => {
      if (event.active.id === stageData.id) setIsDragging(false);
    },
    onDragCancel: (event) => {
      if (event.active.id === stageData.id) setIsDragging(false);
    },
    onDragMove: ({ active, over }) => {
      if (
        over &&
        over.id !== stageData.id &&
        active.data.current.currentStageId !== stageData.id
      ) {
        setStageTasksShown(false);
      }
    },
  });

  const { setNodeRef: dropRef } = useDroppable({
    id: stageData.id,
    data: {
      stageRef,
      showTasks: () => setStageTasksShown(true),
    },
  });

  const combineRefs = (node) => {
    stageRef.current = node;
    dragRef(node);
    dropRef(node);
  };

  const { title, tasksLimit, tasksList = [], id: stageId } = stageData;

  const tasks = tasksList.map((task) => (
    <Task key={task.id} stageId={stageId} taskData={task} />
  ));

  return (
    <StageStyled
      ref={combineRefs}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={isDragging ? "stage--dragged" : "stage"}
      $isDragging={isDragging}
      $isPreviewed={isPreviewed}
    >
      {stageDetailsShown ? (
        <StageDetails
          stageData={stageData}
          hideStageDetails={() => setStageDetailsShown(false)}
        />
      ) : null}

      <StageOverview
        stageTasksShown={stageTasksShown}
        setStageTasksShown={setStageTasksShown}
        showStageDetails={() => setStageDetailsShown(true)}
        tasksList={tasksList}
        tasksLimit={tasksLimit}
        title={title}
        dragListeners={listeners}
        dragAttributes={attributes}
      />

      <TasksList className="tasks-list" $isShown={stageTasksShown}>
        {tasks.length > 0 ? tasks : null}
        {stageData.id === "firstStage" ? <NewTaskPanel /> : null}
      </TasksList>
    </StageStyled>
  );
}
