import { crossIcon, leaveToAppIcon, saveIcon } from "../assets/svg_icons";
import ButtonStyled from "./styled/ButtonStyled";
import styled from "styled-components";
import { tablet, desktop } from "../devicesWidthStandard";

const SaveChangesPanelStyled = styled.div`
  z-index: 999;
  position: absolute;
  top: 2px;
  right: 2px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 40px 20px 40px;
  border-radius: 50px 0 0 0px;
  background-color: var(--primary-color);

  @media (min-width: ${`${tablet}px`}) {
    max-width: calc(600px + 5vw);
  }
`;
SaveChangesPanelStyled.displayName = "SaveChangesPanelStyled";

const SaveChangesPanelContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
SaveChangesPanelContainerStyled.displayName = "SaveChangesPanelContainerStyled";

const ChangesBtnStyled = styled(ButtonStyled)`
  padding: 10px 40px;
  width: 120px;
  background-color: var(--secondary-color);
`;

const CloseBtn = styled(ButtonStyled)`
  align-self: flex-end;
  width: 50px;
  margin: -10px -30px 20px 0px;
  border-radius: 10px;
  background-color: var(--secondary-color);
`;
CloseBtn.displayName = "CloseBtn";

const Title = styled.h3`
  margin-bottom: 60px;
  font-size: 24px;
  color: var(--contrast-primary-color);
`;
Title.displayName = "Title";

export default function SaveChangesPanel({
  isShown,
  setIsShown,
  closeEditingPanel,
  discardChanges,
}) {
  return (
    <SaveChangesPanelStyled $isShown={isShown}>
      <CloseBtn onClick={() => setIsShown(false)}>{crossIcon}</CloseBtn>
      <Title>Uncommited changes.</Title>
      <SaveChangesPanelContainerStyled>
        <ChangesBtnStyled type="submit">{saveIcon}</ChangesBtnStyled>
        <ChangesBtnStyled
          onClick={() => {
            setIsShown(false);
            closeEditingPanel();
            discardChanges();
          }}
        >
          {leaveToAppIcon}
        </ChangesBtnStyled>
      </SaveChangesPanelContainerStyled>
    </SaveChangesPanelStyled>
  );
}
