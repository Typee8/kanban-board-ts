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
  border: ${(props) => {
    if (props.$isDragging) {
      return "3px solid var(--contrast-primary-color)";
    } else if (props.$inDropZone) {
      return "3px solid var(--highlight-secondary-color)";
    } else {
      return "3px solid transparent";
    }
  }};
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
  const [inDropZone, setInDropZone] = useState(false);
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
      if (event.active.id === stageData.id) {
        setStageTasksShown(false);
        setIsDragging(true);
      }
    },
    onDragEnd: (event) => {
      setInDropZone(false);
      if (event.active.id === stageData.id) setIsDragging(false);
    },
    onDragCancel: (event) => {
      setInDropZone(false);
      if (event.active.id === stageData.id) setIsDragging(false);
    },
    onDragOver: ({ active, over }) => {
      if (
        over &&
        over.id === stageData.id &&
        active.data.current.itemType === "task"
      ) {
        setInDropZone(true);
      } else {
        setInDropZone(false);
      }
    },
  });

  const { setNodeRef: dropRef } = useDroppable({
    id: stageData.id,
    data: {
      stageRef,
      setInDropZone,
      showTasks: () => setStageTasksShown(true),
      hideTasks: () => setStageTasksShown(false),
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
      $inDropZone={inDropZone}
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
