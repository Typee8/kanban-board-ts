import { useSelector } from "react-redux";
import styled from "styled-components";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";

const BoardStyled = styled.ul`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

BoardStyled.displayName = "BoardStyled";

export default function Board() {
  const boardState = useSelector((state) => state.boardState);
  console.log(boardState);
  const stages = boardState.map((data) => <Stage key={data.id} data={data} />);

  return (
    <BoardStyled>
      <NewBoardElements />
      {stages}
    </BoardStyled>
  );
}
