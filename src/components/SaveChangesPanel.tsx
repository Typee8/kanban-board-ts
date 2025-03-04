import ButtonStyled from "./styled/ButtonStyled";
import styled from "styled-components";

const SaveChangesPanelStyled = styled.div`
  position: absolute;
  top: 200px;
  display: ${(props) => (props.$isShown ? "flex" : "none")};
  flex-direction: column;
  align-items: start;
  gap: 20px;
  padding: 20px 60px;
  border-radius: 20px;
  background-color: #d5922d;
`;
SaveChangesPanelStyled.displayName = "SaveChangesPanelStyled";

const SaveChangesPanelContainerStyled = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  width: 100%;
`;

SaveChangesPanelContainerStyled.displayName = "SaveChangesPanelContainerStyled";

const CloseBtnStyled = styled(ButtonStyled)`
  align-self: flex-end;
`;

CloseBtnStyled.displayName = "CloseBtnStyled";

export default function SaveChangesPanel({
  isShown,
  setIsShown,
  closeEditingPanel,
  discardChanges,
}) {
  return (
    <SaveChangesPanelStyled $isShown={isShown}>
      <CloseBtnStyled onClick={() => setIsShown(false)}>X</CloseBtnStyled>
      <h3>You didn't save your changes, what would you like to do?</h3>
      <SaveChangesPanelContainerStyled>
        <input type="submit" value="save" onClick={() => setIsShown(false)} />
        <ButtonStyled
          onClick={() => {
            setIsShown(false);
            closeEditingPanel();
            discardChanges();
          }}
        >
          Leave
        </ButtonStyled>
      </SaveChangesPanelContainerStyled>
    </SaveChangesPanelStyled>
  );
}
