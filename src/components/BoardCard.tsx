import { NavLink } from "react-router";
import styled from "styled-components";

const BoardCardStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100px;
  background-color: blanchedalmond;
`;

export default function BoardCard() {
  return (
    <NavLink to="/board-panel">
      <BoardCardStyled>
        <div>Name of Kanban Board</div>
      </BoardCardStyled>
    </NavLink>
  );
}
