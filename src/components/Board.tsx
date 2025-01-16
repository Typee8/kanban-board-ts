import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import styled from "styled-components";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";

function orderStages(state) {
  const stagesOrder = [];

  state.forEach((data) => {
    if (data.id === "first") {
      stagesOrder.push(data);
    }
  });
  state.forEach((data) => {
    if (data.id !== "first" && data.id !== "last") {
      stagesOrder.push(data);
    }
  });
  state.forEach((data) => {
    if (data.id === "last") {
      stagesOrder.push(data);
    }
  });

  return stagesOrder;
}

const BoardStyled = styled.ul`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

BoardStyled.displayName = "BoardStyled";

export default function Board() {
  const boardState = useSelector((state) => state.boardState);
  const stagesOrder = orderStages(boardState);

  const stages = stagesOrder.map((data) => (
    <Stage key={data.id} stageData={data} />
  ));

  return (
    <DndProvider options={HTML5toTouch}>
      <BoardStyled>
        <NewBoardElements />
        {stages}
      </BoardStyled>
    </DndProvider>
  );
}
