import styled from "styled-components";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";
import { useDispatch, useSelector } from "react-redux";
import { moveStage } from "../store/slices/boardStateSlice";
import { useState } from "react";
import { useDrop } from "react-dnd";

const BoardStyled = styled.ul`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

BoardStyled.displayName = "BoardStyled";

export default function Board() {
  const boardState = useSelector((state) => state.boardState);
  const [closestToDraggedStageIndex, setClosestToDraggedStageIndex] =
    useState();
  const dispatch = useDispatch();

  const [{ isOver, draggedItem }, drop] = useDrop(
    () => ({
      accept: "stage",
      drop: (draggedItem, monitor) => {
        const closestStageIndex = getClosestStageIndex(monitor);
        console.log(closestStageIndex);
        dispatch(
          moveStage({
            stageId: draggedItem.stageId,
            closestStageIndex,
          })
        );
        console.log(`Stage moved!`);
      },
      hover: (draggedItem, monitor) =>
        setClosestToDraggedStageIndex(getClosestStageIndex(monitor)),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        draggedItem: monitor.getItem(),
      }),
    }),
    []
  );

  const stages = boardState.map((data) => (
    <Stage key={data.id} stageData={data} />
  ));

  if (isOver) {
    stages.splice(
      closestToDraggedStageIndex,
      0,
      <Stage
        key={`${draggedItem.stageId}--dragged`}
        stageId={draggedItem.stageId}
        stageData={draggedItem.stageData}
        className="stage--dragged"
        isPreviewed={true}
      />
    );
  }

  return (
    <BoardStyled ref={drop}>
      <NewBoardElements />
      {stages}
    </BoardStyled>
  );
}

function getClosestStageIndex(monitor) {
  const draggedItemPosition = monitor.getClientOffset();
  const draggedItemX = draggedItemPosition.x;

  const stagesDOMList = Array.from(document.querySelectorAll(".stage"));
  const stagesMiddleXList = stagesDOMList.map((stage) => {
    const stagePosition = stage.getBoundingClientRect();
    const stageMiddleX = stagePosition.left + stagePosition.width / 2;
    // Tutaj skonczylem
    return stageMiddleX;
  });

  const distanceList = stagesMiddleXList.map((x) => Math.abs(x - draggedItemX));
  const closestStageIndex = distanceList.indexOf(Math.min(...distanceList));

  return closestStageIndex;
}
