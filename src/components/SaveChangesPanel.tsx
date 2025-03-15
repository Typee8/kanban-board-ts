import { crossIcon, leaveToAppIcon, saveIcon } from "../assets/svg_icons";
import ButtonStyled from "./styled/ButtonStyled";
import styled from "styled-components";

const SaveChangesPanelStyled = styled.div`
  z-index: 999;
  position: absolute;
  top: 2px;
  right: 2px;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.$isShown ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  padding: 10px 40px 20px 40px;
  border-radius: 50px 0 0 0px;
  background-color: #fefefe;
`;
SaveChangesPanelStyled.displayName = "SaveChangesPanelStyled";

const SaveChangesPanelContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

SaveChangesPanelContainerStyled.displayName = "SaveChangesPanelContainerStyled";

const ChangesBtnStyled = styled(ButtonStyled)`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px 40px;
  width: 120px;
  background-color: #f3f3f3;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;

const ToolbarBtn = styled(ButtonStyled)`
  align-self: flex-end;
  width: 50px;
  margin: -10px -30px 20px 0px;
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;

const TitleStyled = styled.h3`
  margin-bottom: 60px;
  font-size: 24px;
`;

export default function SaveChangesPanel({
  isShown,
  setIsShown,
  closeEditingPanel,
  discardChanges,
}) {
  return (
    <SaveChangesPanelStyled $isShown={isShown}>
      <ToolbarBtn onClick={() => setIsShown(false)}>{crossIcon}</ToolbarBtn>
      <TitleStyled>Uncommited changes.</TitleStyled>
      <SaveChangesPanelContainerStyled>
        <ChangesBtnStyled type="submit" onClick={() => setIsShown(false)}>
          {saveIcon}
        </ChangesBtnStyled>
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
