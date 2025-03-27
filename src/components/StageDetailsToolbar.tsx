import styled from "styled-components";
import ToolbarBtn from "./styled/ToolbarBtn";
import { trashIcon, crossIcon } from "../assets/svg_icons";

const StageDetailsToolbarStyled = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  padding: 0 10px;
  border-radius: 0 0 0 20px;
  background-color: var(--secondary-color);
`;
StageDetailsToolbarStyled.displayName = "StageDetailsToolbarStyled";

export default function StageDetailsToolbar({
  newStage = false,
  removeStage,
  isFromDirty,
  showSaveChangesPanel,
  hideStageDetails,
}) {
  console.log(removeStage);
  return (
    <StageDetailsToolbarStyled>
      {newStage ? (
        <ToolbarBtn onClick={hideStageDetails}>{crossIcon}</ToolbarBtn>
      ) : (
        <>
          {removeStage ? (
            <ToolbarBtn onClick={removeStage}>{trashIcon}</ToolbarBtn>
          ) : null}
          <ToolbarBtn
            onClick={() =>
              isFromDirty ? showSaveChangesPanel() : hideStageDetails()
            }
          >
            {crossIcon}
          </ToolbarBtn>
        </>
      )}
    </StageDetailsToolbarStyled>
  );
}
