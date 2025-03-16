import styled from "styled-components";
import Task from "./Task";
import StageDetails from "./StageDetails";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "../store/slices/boardStateSlice";
import { useDrop, useDrag } from "react-dnd";
import ArrowDropDown from "./icons/ArrowDropDown";
import { dragIndicatorIcon, taskAltIcon } from "../assets/svg_icons";

const StageStyled = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 10px;
  background-color: #fefefe;
  opacity: ${(props) => {
    if (props.$isDragging) return 0;
    if (props.$isPreviewed) return 0.4;
    return 1;
  }};
`;

StageStyled.displayName = "StageStyled";

const StageContainerStyled = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

StageContainerStyled.displayName = "StageContainerStyled";

const StageTitleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

StageTitleWrapper.displayName = "StageTitleWrapper";

const StageTasksStyled = styled.ul`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;

StageTasksStyled.displayName = "StageTasksStyled";

const H2Styled = styled.h2`
  font-weight: 600;
  margin-right: 20px;
`;

const TaskLimit = styled.span`
  display: flex;
  gap: 5px;
  height: 20px;
`;

const StageDrag = styled.div`
  position: absolute;
  right: 10px;
  width: 30px;
`;

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
      hover: (draggedItem, monitor) => {
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

      <StageTitleWrapper>
        <ArrowDropDown onClick={setStageTasksShown} />
        <StageContainerStyled onClick={() => setStageDetailsShown(true)}>
          <H2Styled className="stage__title">{title}</H2Styled>
          {tasksList.length > 0 ? (
            <TaskLimit>
              {taskAltIcon}
              {tasksList.length}
              {tasksLimit ? `/ ${tasksLimit}` : ""}
            </TaskLimit>
          ) : null}
        </StageContainerStyled>
        <StageDrag ref={drag}>{dragIndicatorIcon}</StageDrag>
      </StageTitleWrapper>

      <StageTasksStyled $isShown={stageTasksShown} className="stage__tasks">
        {tasks.length > 0 ? tasks : null}
      </StageTasksStyled>
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
