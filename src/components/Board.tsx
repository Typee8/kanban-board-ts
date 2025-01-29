import styled from "styled-components";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

const BoardStyled = styled.ul`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

BoardStyled.displayName = "BoardStyled";

export default function Board() {
  const boardState = useSelector((state) => state.boardState);

  const stages = boardState.map((data) => (
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
