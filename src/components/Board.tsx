import styled from "styled-components";
import Stage from "./Stage";
import MenuMobile from "./MenuMobile";
import { moveStage } from "../store/slices/boardStateSlice";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { tablet } from "../devicesWidthStandard.tsx";
import NewStagePanel from "./NewStagePanel.tsx";
import { DndContext, useDroppable, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";

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
  const dispatch = useDispatch();
  const boardRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stageDataState, setStageDataState] = useState();

  const { setNodeRef } = useDroppable({
    id: "Board",
  });

  const stages = boardData.map((data) => (
    <Stage key={data.id} stageData={data} className="stage" />
  ));

  function onDragOver(evt) {
    const { stageData } = evt.active.data.current;
    setStageDataState(stageData);
  }

  function onDrop(evt) {
    const { stageId } = evt.active.data.current;

    const closestStageIndex = getClosestStageIndex(
      mousePosition,
      getStagesPositions(boardRef)
    );

    dispatch(
      moveStage({
        stageId: stageId,
        closestStageIndex,
      })
    );
    console.log(`Stage moved!`);
  }

  const combineRefs = (node) => {
    setNodeRef(node);
    boardRef.current = node;
  };

  return (
    <DndContext onDragMove={onDragOver} onDragEnd={onDrop}>
      <BoardStyled
        /*    onDragOver={scrollPage(mousePosition.y)} */
        onMouseMove={(evt) =>
          setMousePosition({ x: evt.clientX, y: evt.clientY })
        }
        className="Board"
        ref={combineRefs}
      >
        {stages}
        {createPortal(
          <DragOverlay>
            {stageDataState ? (
              <Stage
                key={stageDataState.id}
                stageData={stageDataState}
                isPreviewed={true}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
        <NewStagePanel />
        <MenuMobile />
      </BoardStyled>
    </DndContext>
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
  const stagesDOMList = Array.from(ref.current.querySelectorAll(".stage"));

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
