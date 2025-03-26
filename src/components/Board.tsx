import styled from "styled-components";
import Stage from "./Stage";
import MenuMobile from "./MenuMobile";
import { moveStage, moveTask } from "../store/slices/boardStateSlice";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { tablet } from "../devicesWidthStandard.tsx";
import NewStagePanel from "./NewStagePanel.tsx";
import { DndContext, useDroppable } from "@dnd-kit/core";

const BoardStyled = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  padding-bottom: 120px;
  gap: 30px;
  height: 100%;
  width: 100%;
  background-color: var(--primary-color);

  @media (min-width: ${`${tablet}px`}) {
    flex-direction: row;
    min-width: fit-content;
    gap: 10px;
    padding: 40px;
  }
`;

BoardStyled.displayName = "BoardStyled";

export default function Board({ boardData = [] }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();

  const { setNodeRef: dropRef } = useDroppable({
    id: "Board",
  });

  const stages = boardData.map((data) => (
    <Stage key={data.id} stageData={data} />
  ));

  function onStageDrop(evt) {
    const { stageId } = evt.active.data.current;
    console.log(evt.active);
    const closestStageIndex = getClosestStageIndex(
      mousePosition,
      getStagesPositions()
    );

    dispatch(
      moveStage({
        stageId: stageId,
        closestStageIndex,
      })
    );
    console.log(`Stage moved!`);
  }

  function onTaskDrop(evt) {
    const { currentStageId, taskId } = evt.active.data.current;
    const { stageRef } = evt.over.data.current;
    const newStageId = evt.over.id;

    console.log(evt);

    const closestEleIndex = getClosestTaskIndex(mousePosition, stageRef);

    dispatch(
      moveTask({
        taskId,
        currentStageId,
        newStageId,
        closestEleIndex,
      })
    );
    console.log(`Stage moved!`);
  }

  function handleOnStageDrop(evt) {
    const { itemType } = evt.active.data.current;
    if (itemType === "task") {
      onTaskDrop(evt);
    }

    if (itemType === "stage") {
      onStageDrop(evt);
    }
  }

  return (
    <DndContext onDragEnd={handleOnStageDrop}>
      <BoardStyled
        /*    onDragOver={scrollPage(mousePosition.y)} */
        onMouseMove={(evt) =>
          setMousePosition({ x: evt.clientX, y: evt.clientY })
        }
        className="Board"
        ref={dropRef}
      >
        {stages}
        <NewStagePanel />
        <MenuMobile />
      </BoardStyled>
    </DndContext>
  );
}

function getClosestStageIndex(mousePosition) {
  const Board = document.querySelector(".Board");
  if (!Board) return -1;

  const stagesDOMList = Array.from(document.querySelectorAll(".stage"));
  const isColumn = window.getComputedStyle(Board).flexDirection === "column";

  const distanceList = stagesDOMList.map((stage) => {
    const rect = stage.getBoundingClientRect();
    const stageMiddle = isColumn
      ? rect.top + rect.height / 2
      : rect.left + rect.width / 2;

    return (isColumn ? mousePosition.y : mousePosition.x) - stageMiddle;
  });

  console.log(distanceList);

  if (distanceList.every((item) => item < 0)) return 0;
  if (distanceList.every((item) => item > 0)) return distanceList.length;

  const closestStageIndex = distanceList.indexOf(Math.max(...distanceList)) + 1;

  console.log(closestStageIndex);

  return closestStageIndex;
}

function getStagesPositions() {
  const stagesDOMList = Array.from(document.querySelectorAll(".stage"));

  const stagesPositions = stagesDOMList.map((stage) =>
    stage.getBoundingClientRect()
  );
  console.log(stagesPositions);
  return stagesPositions;
}

export function scrollPage(y) {
  const scrollSpeed = 7;

  const viewportHeight = window.innerHeight;

  // Scroll Down
  if (y > viewportHeight - 200) {
    window.scrollBy(0, scrollSpeed);
  }

  // Scroll Up
  if (y < 200) {
    window.scrollBy(0, -scrollSpeed);
  }
}

function getMiddleYofTasks() {
  const tasksListDOM = Array.from(document.querySelectorAll(".task"));
  console.log("tasksListDOM");
  console.log(tasksListDOM);
  return tasksListDOM.map((task) => {
    const taskPosition = task.getBoundingClientRect();
    console.log(taskPosition.top);
    const taskMiddleY = taskPosition.top + taskPosition.height / 2;
    return taskMiddleY;
  });
}

function getClosestTaskIndex(mousePosition) {
  const draggedItemY = mousePosition.y;
  console.log(draggedItemY);

  const tasksListRect = document
    .querySelector(".tasks-list")
    ?.getBoundingClientRect();

  const distanceList = [
    ...getMiddleYofTasks(),
    tasksListRect.top,
    tasksListRect.bottom,
  ];
  console.log(distanceList);
  for (let i = 0; i < distanceList.length; i++) {
    distanceList[i] = Math.abs(distanceList[i] - draggedItemY);
  }
  console.log(distanceList);
  const closestEleValue = Math.min(...distanceList);
  const closestEleIndex = distanceList.indexOf(closestEleValue);
  console.log(closestEleIndex);
  // when container's top is the closest element
  if (closestEleIndex === distanceList.length - 2) return 0;
  // when container's bottom is the closest element
  if (closestEleIndex === distanceList.length - 1)
    return distanceList.length - 1;

  return closestEleIndex;
}
