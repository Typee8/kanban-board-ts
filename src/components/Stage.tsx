import { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { moveTask } from "../store/slices/boardStateSlice";
import styled from "styled-components";
import Task from "./Task";
import SettingsBtn from "./buttons/SettingsBtn";
import StageSettings from "./StageSettings";
import { useDispatch } from "react-redux";

const StageStyled = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
`;

StageStyled.displayName = "StageStyled";

function getClosestTaskIndex(stageRef, monitor) {
  const draggedItemPosition = monitor.getClientOffset();
  const draggedItemY = draggedItemPosition.y;

  const tasksList = Array.from(
    stageRef.current.querySelectorAll("li:not(.task--dragged)")
  );
  const tasksPositionList = tasksList.map((task) => {
    const taskPosition = task.getBoundingClientRect();
    const taskMiddleY = taskPosition.top + taskPosition.height / 2;
    return taskMiddleY;
  });

  const tasksContainer = stageRef.current.querySelector(".stage__tasks");
  const tasksContainerPosition = tasksContainer.getBoundingClientRect();

  const allElementsPositionList = [
    ...tasksPositionList,
    tasksContainerPosition.top,
    tasksContainerPosition.bottom,
  ];

  const distanceList = allElementsPositionList.map((task) =>
    Math.abs(task - draggedItemY)
  );
  const closestEleValue = Math.min(...distanceList);

  const closestEleIndex = distanceList.indexOf(closestEleValue);

  if (closestEleIndex === distanceList.length - 2) {
    return 0;
  }
  if (closestEleIndex === distanceList.length - 1) {
    return distanceList.length - 1;
  }

  return closestEleIndex;
}

export default function Stage({ stageData }) {
  const [stageSettingsShown, setStageSettingsShown] = useState(false);
  const [mousePositionY, setMousePositionY] = useState(false);
  const [closestToDraggedItemIndex, setClosestToDraggedItemIndex] = useState();
  /*   const [tasksPreview, setTasksPreview] = useState(stageData.tasksList); */

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
      hover: (draggedItem, monitor) => {
        setClosestToDraggedItemIndex(getClosestTaskIndex(stageRef, monitor));

        /* 
        const { tasksList } = stageData;
        const tasksListCopy = JSON.parse(JSON.stringify(tasksList));
        const tasks = tasksListCopy.map((data) => {
          let key = data.id;

          return <Task key={key} stageId={stageData.id} data={data} />;
        });

        if (!monitor.isOver()) {
          setTasksPreview(tasks);
          return;
        }

        const closestEleIndex = getClosestTaskIndex(stageRef, monitor);
        const draggedItemPreviewData = JSON.parse(
          JSON.stringify(draggedItem.taskData)
        );
        draggedItemPreviewData.id = "dragged";

        if (tasksListCopy[closestEleIndex].id === draggedItem.taskId) {
          setTasksPreview(tasks);
        } else {
          tasks.splice(
            closestEleIndex,
            0,
            <Task
              key={`${draggedItem.taskId}--dragged`}
              stageId={stageData.id}
              data={draggedItemPreviewData}
              className="task--dragged"
            />
          );

          setTasksPreview(tasks);
        } */
      },
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

  const { title, tasksList } = stageData;
  const tasks = tasksList.map((data) => (
    <Task key={data.id} stageId={stageData.id} data={data} />
  ));

  const tasksPreview = [];

  if (isOver) {
    tasksPreview.push(...tasks);

    tasksPreview.splice(
      closestToDraggedItemIndex,
      0,
      <Task
        key={`${draggedItem.taskId}--dragged`}
        stageId={stageData.id}
        data={draggedItem.taskData}
        className="task--dragged"
        isPreviewed={true}
      />
    );
  }

  return (
    <StageStyled ref={stageRefsCombined} className="stage">
      <SettingsBtn
        className="stage__settings"
        onClick={() => setStageSettingsShown(true)}
      />
      <h2 className="stage__title">{title}</h2>
      <ul className="stage__tasks">{isOver ? tasksPreview : tasks}</ul>
      <StageSettings
        data={stageData}
        stageSettingsShown={stageSettingsShown}
        setStageSettingsShown={() => setStageSettingsShown(false)}
      />
    </StageStyled>
  );
}
