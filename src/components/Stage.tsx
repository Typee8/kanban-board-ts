import { useState, useRef } from "react";
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

  const stageChildrenList = Array.from(stageRef.current.querySelectorAll("li"));
  const childrenPositionList = stageChildrenList.map((ele) => {
    const elePosition = ele.getBoundingClientRect();
    const eleMiddleY = elePosition.top + elePosition.height / 2;
    return eleMiddleY;
  });

  const distanceList = childrenPositionList.map((ele) =>
    Math.abs(ele - draggedItemY)
  );
  const closestEleValue = Math.min(...distanceList);
  const closestEleIndex = distanceList.indexOf(closestEleValue);

  return closestEleIndex;
}

function assignTasks(stageData, isOver, draggedItem, closestEleIndex) {
  console.log("assignTasks() launched");
  const { tasksList } = stageData;
  const tasksListCopy = JSON.parse(JSON.stringify(tasksList));
  if (isOver === false) {
    console.log("launched");
    const tasks = tasksListCopy.map((data) => (
      <Task key={data.id} stageId={stageData.id} data={data} />
    ));
    console.log(`tasks inside the map() ${tasks}`);
    return tasks;
  }
  console.log(`Is draggedItem present?: ${draggedItem}`);
  const tasks = tasksListCopy.map((data) => {
    if (
      stageData.id === draggedItem.stageId &&
      task.id === draggedItem.taskId
    ) {
      return (
        <Task
          key={data.id}
          stageId={stageData.id}
          data={data}
          isVisible={false}
        />
      );
    }

    return <Task key={data.id} stageId={stageData.id} data={data} />;
  });

  tasks.splice(
    closestEleIndex,
    0,
    <Task
      key={draggedItem.taskId}
      stageId={stageData.id}
      data={draggedItem.taskData}
    />
  );
  return tasks;
}

export default function Stage({ stageData }) {
  const [stageSettingsShown, setStageSettingsShown] = useState(false);
  const [tasksPreviewList, setTasksPreviewList] = useState(stageData.tasksList);
  const [closestEleIndex, setClosestEleIndex] = useState();

  const stageRef = useRef();
  const dispatch = useDispatch();
  const [{ isOver, draggedItem }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (draggedItem, monitor) => {
        const { closestEleIndex } = getClosestTaskIndex(stageRef, monitor);
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
        /*         const draggedItemIndex = tasksPreviewList.findIndex(
          (task) => task.id === draggedItem.taskId
        );
        const newTasksList = JSON.parse(JSON.stringify(tasksPreviewList));
        if (stageData.id === draggedItem.stageId)
          newTasksList.splice(draggedItemIndex, 1);

        if (draggedItemIndex >= 0) newTasksList.splice(draggedItemIndex, 1);
        const { closestEleIndex } = getClosestTaskIndex(stageRef, monitor);
        newTasksList.splice(closestEleIndex, 0, draggedItem.taskData);
        setTasksPreviewList(newTasksList); */

        setClosestEleIndex(getClosestTaskIndex(stageRef, monitor));
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        item: monitor.getItem(),
      }),
    }),
    []
  );

  const tasks = assignTasks(stageData, isOver, draggedItem, closestEleIndex);

  console.log(tasks);
  /* 
  if (isOver) {
    const { tasksList } = stageData;
    const draggedItemIndex = tasksList.findIndex(
      (task) => task.id === draggedItem.taskId
    );
    if (draggedItemIndex < 0) return null;
    const newTasksList = JSON.parse(JSON.stringify(tasksList));
    const newTasksJSX = tasksList.map((data) => (
      <Task key={data.id} stageId={stageData.id} data={data} />
    ));

    if (stageData.id === draggedItem.stageId)
      newTasksList.splice(draggedItemIndex, 1);
  } */

  const stageRefsCombined = (node) => {
    stageRef.current = node;
    drop(node);
  };

  const { title, tasksList } = stageData;
  /*   const tasks = tasksList.map((data) => (
    <Task key={data.id} stageId={stageData.id} data={data} />
  ));
 */
  /*   const tasksPreview = tasksPreviewList.map((data) => (
    <Task key={data.id} stageId={stageData.id} data={data} />
  )); */
  /* 
  const tasksWithPreview = tasks;
  tasksWithPreview.splice(closestEleIndex, 0, item.taskRef); */

  /* 
  
  idea about hover animation!

  new return of tasks which doesn't update redux state!
  
  if isOver
  then return tasksPreview!

  create new array of Tasks


  */

  //create new array of tasks

  /* 
  
  newTasksArray <=== tasks from redux store


  */

  return (
    <StageStyled ref={stageRefsCombined} className="stage">
      <SettingsBtn
        className="stage__settings"
        onClick={() => setStageSettingsShown(true)}
      />
      <h2 className="stage__title">{title}</h2>
      <ul className="stage__tasks">{tasks}</ul>
      <StageSettings
        data={stageData}
        stageSettingsShown={stageSettingsShown}
        setStageSettingsShown={() => setStageSettingsShown(false)}
      />
    </StageStyled>
  );
}
