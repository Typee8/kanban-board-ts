import styled from "styled-components";
import { useState } from "react";
import ButtonStyled from "./styled/ButtonStyled";
import { tablet } from "../devicesWidthStandard";
import OpenBoardForm from "./forms/OpenBoardForm";
import NewBoardPanel from "./NewBoardPanel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const SetupPanelStyled = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
`;

SetupPanelStyled.displayName = "SetupPanelStyled";

const Title = styled.h2`
  --font-size: calc(24px + 5vw);
  font-size: var(--font-size);
  font-weight: 600;
  margin-top: 100px;
  padding-inline: 30px;
  color: var(--contrast-primary-color);

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-size) * var(--font-tablet-scale));
  }
`;
Title.displayName = "Title";

const ReturnTitle = styled(Title)`
  --font-size: calc(16px + 5vw);
`;
ReturnTitle.displayName = "ReturnTitle";

const SetupPanelBtn = styled(ButtonStyled)`
  --font-size: calc(16px + 1vw);
  min-width: 150px;
  min-height: 60px;
  padding: 30px;
  font-size: var(--font-size);
  background-color: var(--secondary-color);

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-size) * 0.8);
  }
`;
SetupPanelBtn.displayName = "SetupPanelBtn";

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (min-width: ${`${tablet}px`}) {
    margin-top: 20vh;
    flex-direction: row;
    gap: calc(80px + 1vw);
  }
`;

export default function SetupPanel() {
  const navigate = useNavigate();
  const [newBoardPanelShown, setNewBoardPanelShown] = useState(false);
  const [formShown, setFormShown] = useState(false);
  const { boardId } = useSelector((state) => state.boardState);

  return (
    <SetupPanelStyled>
      {boardId ? (
        <ReturnTitle>You can return to your board!</ReturnTitle>
      ) : (
        <Title>Kanban Board</Title>
      )}

      <Container>
        <SetupPanelBtn onClick={() => setFormShown(true)}>
          Open existing board
        </SetupPanelBtn>
        {boardId && (
          <SetupPanelBtn onClick={() => navigate("/board-panel")}>
            Return
          </SetupPanelBtn>
        )}
        <SetupPanelBtn onClick={() => setNewBoardPanelShown(true)}>
          Create new board
        </SetupPanelBtn>
      </Container>

      {formShown && <OpenBoardForm closeForm={() => setFormShown(false)} />}

      {newBoardPanelShown && (
        <NewBoardPanel close={() => setNewBoardPanelShown(false)} />
      )}
    </SetupPanelStyled>
  );
}
