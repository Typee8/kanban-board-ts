import styled from "styled-components";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";
import { moveStage } from "../store/slices/boardStateSlice";
import { useEffect, useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { tablet } from "../devicesWidthStandard";

const BoardStyled = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;

  @media (min-width: ${tablet}) {
    flex-direction: row;
  }
`;

BoardStyled.displayName = "BoardStyled";

export default function Board({ boardData }) {
  const dispatch = useDispatch();
  const boardRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stagesPositions, setStagesPositions] = useState([]);

  useEffect(() => {
    setStagesPositions(getStagesPositions(boardRef));
  }, []);

  const [{ isOver, draggedItem }, drop] = useDrop(
    () => ({
      accept: "stage",
      drop: (draggedItem) => {
        const closestStageIndex = getClosestStageIndex(
          mousePosition.x,
          stagesPositions
        );
        console.log(stagesPositions);
        console.log(`stagesPositions ${stagesPositions}`);
        dispatch(
          moveStage({
            stageId: draggedItem.stageId,
            closestStageIndex,
          })
        );
        setStagesPositions(getStagesPositions(boardRef));
        console.log(`Stage moved!`);
      },
      hover: (item, monitor) => {
        setMousePosition(monitor.getClientOffset());
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        draggedItem: monitor.getItem(),
      }),
    }),
    [mousePosition, stagesPositions]
  );

  if (boardData === null) boardData = [];

  const stages = boardData.map((data) => (
    <Stage key={data.id} stageData={data} className="stage" />
  ));

  if (isOver) {
    const closestStageIndex = getClosestStageIndex(
      mousePosition.x,
      stagesPositions
    );

    if (boardData[closestStageIndex].id !== draggedItem.stageId) {
      console.log(closestStageIndex);

      stages.splice(
        closestStageIndex,
        0,
        <Stage
          key={`${draggedItem.stageId}--dragged`}
          stageData={draggedItem.stageData}
          className="stage--dragged"
          isPreviewed={true}
        />
      );
    }
  }

  const combineRefs = (node) => {
    boardRef.current = node;
    drop(node);
  };

  return (
    <BoardStyled ref={combineRefs}>
      <NewBoardElements />
      {stages}
    </BoardStyled>
  );
}

function getClosestStageIndex(mousePositionX, stagesPositions) {
  const distanceList = stagesPositions.map((x) =>
    Math.abs(x.right - mousePositionX)
  );
  const closestStageIndex = distanceList.indexOf(Math.min(...distanceList));

  return closestStageIndex;
}

function getStagesPositions(ref) {
  const stagesDOMList = Array.from(
    ref.current.querySelectorAll(".stage:not(.stage--dragged)")
  );

  const stagesPositions = stagesDOMList.map((stage) =>
    stage.getBoundingClientRect()
  );

  return stagesPositions;
}
