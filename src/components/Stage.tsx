import styled from "styled-components";
import Task from "./Task";
import StageDetails from "./StageDetails";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "../store/slices/boardStateSlice";
import { useDrop } from "react-dnd";
import StageOverview from "./StageOverview";
import NewTaskPanel from "./NewTaskPanel";
import { tablet } from "../devicesWidthStandard";
import {
  useDraggable,
  useDroppable,
  useDndMonitor,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";

export const StageStyled = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 10px;
  min-width: 250px;
  background-color: var(--secondary-color);
  height: ${(props) => (props.$isPreviewed ? "100%" : "initial")};
  border: ${(props) =>
    props.$isPreviewed
      ? "6px solid var(--contrast-primary-color)"
      : "6px solid transparent"};
  opacity: ${(props) => (props.$isDragging ? 0 : 1)};

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

export default function Stage({ stageData, className, isPreviewed = false }) {
  const [stageDetailsShown, setStageDetailsShown] = useState(false);
  const [stageTasksShown, setStageTasksShown] = useState(false);
  const [closestToDraggedTaskIndex, setClosestToDraggedTaskIndex] = useState();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [taskDataState, setTaskDataState] = useState();
  const stageRef = useRef();
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: stageData.id,
    data: {
      stageId: stageData.id,
      stageData,
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
  });

  const { setNodeRef: dropRef } = useDroppable({
    id: stageData.id,
  });

  /*   const [{ isOver, draggedItem }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (draggedItem, monitor) => {
        const closestEleIndex = getClosestTaskIndex(stageRef, monitor);

        dispatch(
          moveTask({
            taskId: draggedItem.taskId,
            currentStageId: draggedItem.stageId,
            newStageId: stageData.id,
            closestEleIndex,
          })
        );
        console.log(`Task moved!`);
      },
      hover: (_, monitor) => {
        setClosestToDraggedTaskIndex(getClosestTaskIndex(stageRef, monitor));
        setStageTasksShown(true);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        draggedItem: monitor.getItem(),
      }),
    }),
    []
  ); */

  function onDrop(evt) {
    const { stageId, taskData } = evt.active.data.current;

    const closestEleIndex = getClosestTaskIndex(mousePosition, stageRef);

    dispatch(
      moveTask({
        taskId: taskData.id,
        currentStageId: stageId,
        newStageId: stageData.id,
        closestEleIndex,
      })
    );
    console.log(`Stage moved!`);
  }

  const combineRefs = (node) => {
    stageRef.current = node;
    setNodeRef(node);
    dropRef(node);
    /*     drop(node); */
  };

  const { title, tasksLimit, tasksList = [], id: stageId } = stageData;

  const tasks = tasksList.map((task) => (
    <Task key={task.id} stageId={stageId} taskData={task} />
  ));

  function onDragOver(evt) {
    const { taskData } = evt.active.data.current;
    setTaskDataState(taskData);
  }

  return (
    <DndContext onDragMove={onDragOver} onDragEnd={onDrop}>
      <StageStyled
        onMouseMove={(evt) =>
          setMousePosition({ x: evt.clientX, y: evt.clientY })
        }
        ref={combineRefs}
        className={className}
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

        {tasks.length > 0 ? (
          <TasksList $isShown={stageTasksShown} className="stage__tasks">
            {tasks}
            {createPortal(
              <DragOverlay>
                {taskDataState ? (
                  <Task
                    key={taskDataState.id}
                    taskData={taskDataState}
                    isPreviewed={true}
                  />
                ) : null}
              </DragOverlay>,
              document.body
            )}
            {stageData.id === "firstStage" ? <NewTaskPanel /> : null}
          </TasksList>
        ) : null}
      </StageStyled>
    </DndContext>
  );
}

function getMiddleYCoordinatesOfTasks(stageRef) {
  const tasksDOMList = Array.from(stageRef.current.querySelectorAll("li"));

  return tasksDOMList.map((task) => {
    const taskPosition = task.getBoundingClientRect();
    const taskMiddleY = taskPosition.top + taskPosition.height / 2;
    return taskMiddleY;
  });
}

function getClosestTaskIndex(mousePosition, stageRef) {
  const draggedItemY = mousePosition.y;

  const tasksContainerDOM = stageRef.current.querySelector(".stage__tasks");
  const tasksContainerPosition = tasksContainerDOM.getBoundingClientRect();

  const distanceList = [
    ...getMiddleYCoordinatesOfTasks(stageRef),
    tasksContainerPosition.top,
    tasksContainerPosition.bottom,
  ];

  for (let i = 0; i < distanceList.length; i++) {
    distanceList[i] = Math.abs(distanceList[i] - draggedItemY);
  }

  const closestEleValue = Math.min(...distanceList);
  const closestEleIndex = distanceList.indexOf(closestEleValue);

  // when container's top is the closest element
  if (closestEleIndex === distanceList.length - 2) return 0;
  // when container's bottom is the closest element
  if (closestEleIndex === distanceList.length - 1)
    return distanceList.length - 1;

  return closestEleIndex;
}
