import styled from "styled-components";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";
import { useDispatch, useSelector } from "react-redux";
import { moveStage } from "../store/slices/boardStateSlice";
import { useEffect, useState, useRef } from "react";
import { useDrop } from "react-dnd";

const BoardStyled = styled.ul`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

BoardStyled.displayName = "BoardStyled";

export default function Board() {
  const boardState = useSelector((state) => state.boardState);
  const boardRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stagesPositions, setStagesPositions] = useState([]);

  useEffect(() => {
    setStagesPositions(getStagesPositions(boardRef));
  }, []);

  const dispatch = useDispatch();

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

  const stages = boardState.map((data) => (
    <Stage key={data.id} stageData={data} className="stage" />
  ));

  if (isOver) {
    const closestStageIndex = getClosestStageIndex(
      mousePosition.x,
      stagesPositions
    );

    if (boardState[closestStageIndex].id !== draggedItem.stageId) {
      console.log(closestStageIndex);

      stages.splice(
        closestStageIndex + 1,
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
  const stagesMiddleXList = stagesPositions.map((position) => {
    const stageMiddleX = position.left + position.width / 2;

    return stageMiddleX;
  });

  console.log(stagesPositions);

  const distanceList = stagesMiddleXList.map((x) =>
    Math.abs(x - mousePositionX)
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
