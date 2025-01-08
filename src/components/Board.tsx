import { useSelector } from "react-redux";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";
import styled from "styled-components";

const BoardStyled = styled.ul`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

export default function Board() {
  const boardState = useSelector((state) => state.boardState);
  const stages = boardState.map((data) => <Stage data={data} />);

  return (
    <BoardStyled className="board">
      <NewBoardElements />
      {stages}
    </BoardStyled>
  );
}
