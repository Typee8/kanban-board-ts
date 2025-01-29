import styled from "styled-components";
import Task from "./Task";
import SettingsBtn from "./buttons/SettingsBtn";
import StageSettings from "./StageSettings";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "../store/slices/boardStateSlice";
import { useDrop } from "react-dnd";

const StageStyled = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
`;

StageStyled.displayName = "StageStyled";

export default function Stage({ stageData }) {
  const [stageSettingsShown, setStageSettingsShown] = useState(false);
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

  const stageRefsCombined = (node) => {
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

  return (
    <StageStyled ref={stageRefsCombined} className="stage">
      <SettingsBtn
        className="stage__settings"
        onClick={() => setStageSettingsShown(true)}
      />
      <h2 className="stage__title">{title}</h2>
      <ul className="stage__tasks">{tasks}</ul>
      <StageSettings
        stageData={stageData}
        stageSettingsShown={stageSettingsShown}
        setStageSettingsShown={() => setStageSettingsShown(false)}
      />
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
