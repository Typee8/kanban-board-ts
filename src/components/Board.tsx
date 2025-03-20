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
  padding: 40px 20px;
  padding-bottom: 120px;
  gap: 30px;
  height: 100%;

  @media (min-width: ${`${tablet}px`}) {
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

  useEffect(() => {
    window.addEventListener("pointermove", (evt) => {
      setMousePosition({ x: evt.clientX, y: evt.clientY });
    });

    return () =>
      window.removeEventListener("dragover", (evt) =>
        setMousePosition({ x: evt.clientX, y: evt.clientY })
      );
  }, []);

  const [{ isOver, draggedItem }, drop] = useDrop(
    () => ({
      accept: "stage",
      drop: (draggedItem) => {
        const closestStageIndex = getClosestStageIndex(
          mousePosition,
          stagesPositions
        );

        dispatch(
          moveStage({
            stageId: draggedItem.stageId,
            closestStageIndex,
          })
        );
        setStagesPositions(getStagesPositions(boardRef));
        console.log(`Stage moved!`);
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
      mousePosition,
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
    <BoardStyled
      onDragOver={scrollPage(mousePosition.y)}
      className="Board"
      ref={combineRefs}
    >
      {stages}
      <NewBoardElements />
    </BoardStyled>
  );
}

function getClosestStageIndex(mousePosition, stagesPositions) {
  const Board = document.querySelector(".Board");
  let distanceList;

  if (window.getComputedStyle(Board).flexDirection === "column") {
    distanceList = stagesPositions.map((y) =>
      Math.abs(y.top - mousePosition.y)
    );
    console.log(mousePosition.y);
  } else {
    distanceList = stagesPositions.map((x) =>
      Math.abs(x.right - mousePosition.x)
    );
    console.log(distanceList);
  }

  const closestStageIndex = distanceList.indexOf(Math.min(...distanceList));
  console.log(distanceList);

  return closestStageIndex;
}

function getStagesPositions(ref) {
  const stagesDOMList = Array.from(
    ref.current.querySelectorAll(".stage:not(.stage--dragged)")
  );

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
