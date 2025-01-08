import styled from "styled-components";

const BoardSettingStyled = styled.ul`
  position: absolute;
  top: 100px;
  width: 100vw;
  height: 50vh;
  background-color: blanchedalmond;
`;

export default function BoardSettings() {
  return (
    <BoardSettingStyled>
      <li>
        <button>Delete board</button>
      </li>
      <li>
        Change name
        <input></input>
        <button>submit</button>
      </li>
    </BoardSettingStyled>
  );
}
