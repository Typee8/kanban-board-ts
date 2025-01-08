import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Stage from "./Stage";
import NewBoardElements from "./NewBoardElements";
import { useState } from "react";

const BoardStyled = styled.ul`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

export default function Board() {
  const boardState = useSelector((state) => state.boardState);
  const stages = boardState.map((data) => <Stage key={data.ID} data={data} />);

  return (
    <BoardStyled className="board">
      <NewBoardElements />
      {stages}
    </BoardStyled>
  );
}
