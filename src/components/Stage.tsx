import styled from "styled-components";
import Task from "./Task";
import SettingsBtn from "./buttons/SettingsBtn";
import StageDetails from "./StageDetails";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "../store/slices/boardStateSlice";
import { useDrop, useDrag } from "react-dnd";

const StageStyled = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  opacity: ${(props) => {
    if (props.$isDragging) return 0;
    if (props.$isPreviewed) return 0.4;
    return 1;
  }};
`;

StageStyled.displayName = "StageStyled";

const StageContainerStyled = styled.ul`
  padding: 20px;
`;

StageContainerStyled.displayName = "StageContainerStyled";

const StageTasksStyled = styled.ul`
  padding: 20px;
`;

StageTasksStyled.displayName = "StageTasksStyled";

export default function Stage({ stageData, className, isPreviewed = false }) {
  const [stageDetailsShown, setStageDetailsShown] = useState(false);
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
      hover: (draggedItem, monitor) =>
        setClosestToDraggedTaskIndex(getClosestTaskIndex(stageRef, monitor)),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        draggedItem: monitor.getItem(),
      }),
    }),
    []
  );

  const [{ isDragging }, drag] = useDrag(() => ({
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
    drop(node);
  };

  const { title, tasksList, id: stageId } = stageData;

  const tasks = getTasksJSX(
    isOver,
    stageId,
    tasksList,
    draggedItem,
    closestToDraggedTaskIndex
  );

  console.log(tasks);

  return (
    <StageStyled
      ref={combineRefs}
      className={className}
      $isDragging={isDragging}
      $isPreviewed={isPreviewed}
    >
      <StageContainerStyled ref={drag}>
        <StageDetails
          stageData={stageData}
          stageDetailsShown={stageDetailsShown}
          setStageDetailsShown={() => setStageDetailsShown(false)}
        />
        <SettingsBtn
          className="stage__settings"
          onClick={() => setStageDetailsShown(true)}
        />
        <h2 className="stage__title">{title}</h2>
      </StageContainerStyled>
      {tasks.length > 0 ? (
        <StageTasksStyled className="stage__tasks">{tasks}</StageTasksStyled>
      ) : null}
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
  tasksList = [],
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
