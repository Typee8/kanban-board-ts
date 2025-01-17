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

export default function Stage({ stageData }) {
  const [stageSettingsShown, setStageSettingsShown] = useState(false);
  const stageRef = useRef();
  const dispatch = useDispatch();
  const [, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (draggedItem, monitor) => {
        // get dragged item position
        const draggedItemPosition = monitor.getClientOffset();
        const draggedItemY = draggedItemPosition.y;
        console.log(draggedItemY);
        // get the middle position of every child element
        const stageChildrenList = Array.from(
          stageRef.current.querySelectorAll("li")
        );
        const childrenPositionList = stageChildrenList.map((ele) => {
          const elementPosition = ele.getBoundingClientRect();
          const elementVerticalMiddle =
            elementPosition.top + elementPosition.height / 2;
          return elementVerticalMiddle;
        });
        // find the one which is the closest to the dragged item
        const positionComparisonList = childrenPositionList.map((ele) =>
          Math.abs(ele - draggedItemY)
        );

        const closestElementValue = Math.min(...positionComparisonList);
        console.log(`closestElementValue: ${closestElementValue}`);
        const closestElementIndex =
          positionComparisonList.indexOf(closestElementValue);
        console.log(closestElementIndex);

        return dispatch(
          moveTask({
            taskId: draggedItem.taskId,
            currentStageId: draggedItem.stageId,
            newStageId: stageData.id,
            closestElementIndex,
          })
        );
      },
      hover: (item, monitor) => {
        // get dragged item position
        const draggedItemPosition = monitor.getClientOffset();
        const draggedItemY = draggedItemPosition.y;
        console.log(draggedItemY);
        // get the middle position of every child element
        const stageChildrenList = Array.from(
          stageRef.current.querySelectorAll("li")
        );
        const childrenPositionList = stageChildrenList.map((ele) => {
          const elementPosition = ele.getBoundingClientRect();
          const elementVerticalMiddle =
            elementPosition.top + elementPosition.height / 2;
          return elementVerticalMiddle;
        });
        // find the one which is the closest to the dragged item
        const positionComparisonList = childrenPositionList.map((ele) =>
          Math.abs(ele - draggedItemY)
        );

        const closestElementValue = Math.min(...positionComparisonList);
        console.log(`closestElementValue: ${closestElementValue}`);
        const closestElement =
          positionComparisonList.indexOf(closestElementValue);
        console.log(closestElement);
      },
    }),
    []
  );

  const stageRefsCombined = (node) => {
    stageRef.current = node;
    drop(node);
  };
  //(node) => drag(drop(node))

  function onTaskDrop(taskId, currentStageId, newStageId) {
    dispatch(moveTask({ taskId, currentStageId, newStageId }));
  }

  const { title, tasksList } = stageData;
  const tasks = tasksList.map((data) => (
    <Task key={data.id} stageId={stageData.id} data={data} />
  ));
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
