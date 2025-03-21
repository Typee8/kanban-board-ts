import { stageAddIcon } from "../assets/svg_icons";
import { StageStyled } from "./Stage";
import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import { tablet } from "../devicesWidthStandard";
import StageDetails from "./StageDetails";
import { useState } from "react";

const NewStagePanelStyled = styled(StageStyled)`
  display: none;

  @media (min-width: ${`${tablet}px`}) {
    display: flex;
    transition: all 0.3s ease;
    border: 6px solid transparent;

    &:hover {
      border: 6px solid var(--contrast-primary-color);
    }
  }
`;
NewStagePanelStyled.displayName = "NewStagePanelStyled";

const Btn = styled(ButtonStyled)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  &:hover {
    color: unset;
    background: none;
  }
`;
Btn.displayName = "Btn";

const IconContainer = styled.div`
  width: 30px;
`;
IconContainer.displayName = "IconContainer";

export default function NewStagePanel() {
  const [stageDetailsShown, setStageDetailsShown] = useState(false);

  return (
    <NewStagePanelStyled>
      <Btn onClick={() => setStageDetailsShown(true)}>
        <IconContainer>{stageAddIcon}</IconContainer>
      </Btn>

      {stageDetailsShown ? (
        <StageDetails setStageDetailsShown={setStageDetailsShown} />
      ) : null}
    </NewStagePanelStyled>
  );
}
