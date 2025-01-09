import Menu from "./Menu";
import BoardCard from "./BoardCard";
import styled from "styled-components";

const SetupPanelStyled = styled.main`
  display: flex;
  flex-direction: column;
`;

SetupPanelStyled.displayName = "SetupPanelStyled";

export default function SetupPanel() {
  return (
    <SetupPanelStyled>
      <Menu />
      <div>
        <BoardCard />
        <div>
          <button>+</button>
        </div>
      </div>
    </SetupPanelStyled>
  );
}
