import styled from "styled-components";
import Task from "./Task";
import StageDetails from "./StageDetails";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "../store/slices/boardStateSlice";
import { useDrop, useDrag } from "react-dnd";
import StageOverview from "./StageOverview";
import NewTaskPanel from "./NewTaskPanel";
import { tablet } from "../devicesWidthStandard";

export const StageStyled = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 10px;
  min-width: 250px;
  background-color: var(--secondary-color);
  opacity: ${(props) => {
    if (props.$isDragging) return 0;
    if (props.$isPreviewed) return 0.4;
    return 1;
  }};
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
  const stageRef = useRef();
  const dispatch = useDispatch();

  const [{ isOver, draggedItem }, drop] = useDrop(
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
  );

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "stage",
    item: {
      stageId: stageData.id,
      stageData,
      stageRef,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const combineRefs = (node) => {
    stageRef.current = node;
    dragPreview(node);
    drop(node);
  };

  const { title, tasksLimit, tasksList = [], id: stageId } = stageData;

  const tasks = getTasksJSX(
    isOver,
    stageId,
    tasksList,
    draggedItem,
    closestToDraggedTaskIndex
  );

  return (
    <StageStyled
      ref={combineRefs}
      className={className}
      $isDragging={isDragging}
      $isPreviewed={isPreviewed}
    >
      {stageDetailsShown ? (
        <StageDetails
          stageData={stageData}
          setStageDetailsShown={() => setStageDetailsShown(false)}
        />
      ) : null}

      <StageOverview
        stageTasksShown={stageTasksShown}
        setStageTasksShown={setStageTasksShown}
        showStageDetails={() => setStageDetailsShown(true)}
        tasksList={tasksList}
        tasksLimit={tasksLimit}
        title={title}
        drag={drag}
      />

      <TasksList $isShown={stageTasksShown} className="stage__tasks">
        {tasks.length > 0 ? tasks : null}
        {stageData.id === "firstStage" ? <NewTaskPanel /> : null}
      </TasksList>
    </StageStyled>
  );
}

function getMiddleYCoordinatesOfTasks(stageRef) {
  const tasksDOMList = Array.from(
    stageRef.current.querySelectorAll("li:not(.task--dragged)")
  );

  return tasksDOMList.map((task) => {
    const taskPosition = task.getBoundingClientRect();
    const taskMiddleY = taskPosition.top + taskPosition.height / 2;
    return taskMiddleY;
  });
}

function getClosestTaskIndex(stageRef, monitor) {
  const draggedItemPosition = monitor.getClientOffset();
  const draggedItemY = draggedItemPosition.y;

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

function getTasksJSX(
  isTaskDragged,
  stageId,
  tasksList,
  draggedItem,
  closestToDraggedTaskIndex
) {
  const tasksJSX = [];

  tasksList.forEach((task) => {
    const taskJSX = <Task key={task.id} stageId={stageId} taskData={task} />;
    tasksJSX.push(taskJSX);
  });

  if (isTaskDragged) {
    tasksJSX.splice(
      closestToDraggedTaskIndex,
      0,
      <Task
        key={`${draggedItem.taskId}--dragged`}
        stageId={stageId}
        taskData={draggedItem.taskData}
        className="task--dragged"
        isPreviewed={true}
      />
    );
  }

  return tasksJSX;
}
