import { crossIcon } from "../assets/svg_icons";
import ButtonStyled from "./styled/ButtonStyled";
import styled from "styled-components";

const SaveChangesPanelStyled = styled.div`
  z-index: 999;
  position: absolute;
  top: 2px;
  right: 2px;

  height: 120px;
  display: ${(props) => (props.$isShown ? "flex" : "none")};
  flex-direction: column;
  padding: 0 10px 20px 20px;
  border-radius: 0 0 0 20px;
  background-color: #fefefe;
`;
SaveChangesPanelStyled.displayName = "SaveChangesPanelStyled";

const SaveChangesPanelContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  gap: 20px;
`;

SaveChangesPanelContainerStyled.displayName = "SaveChangesPanelContainerStyled";

const ChangesBtnStyled = styled(ButtonStyled)`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100px;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;

const ToolbarBtn = styled(ButtonStyled)`
  align-self: flex-end;
  width: 50px;
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
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
      <SaveChangesPanelContainerStyled>
        <ChangesBtnStyled type="submit" onClick={() => setIsShown(false)}>
          Commit changes
        </ChangesBtnStyled>
        <ChangesBtnStyled
          onClick={() => {
            setIsShown(false);
            closeEditingPanel();
            discardChanges();
          }}
        >
          Discard changes
        </ChangesBtnStyled>
      </SaveChangesPanelContainerStyled>
    </SaveChangesPanelStyled>
  );
}
