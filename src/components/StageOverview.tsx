import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import ArrowDropDown from "./ArrowDropDown";
import { taskAltIcon, dragIndicatorIcon } from "../assets/svg_icons";
import { tablet } from "../devicesWidthStandard";

const StageOverviewStyled = styled.div`
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--contrast-primary-color);
`;
StageOverviewStyled.displayName = "StageOverviewStyled";

const DropDownBtnStyled = styled(ButtonStyled)`
  width: 60px;

  &:hover {
    color: unset;
    background: none;
  }

  @media (min-width: ${`${tablet}px`}) {
    display: none;
  }
`;
DropDownBtnStyled.displayName = "DropDownBtnStyled";

const Container = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
`;
Container.displayName = "Container";

const Title = styled.h2`
  --font-size: 20px;

  font-weight: 600;
  margin-right: 20px;
  color: var(--contrast-primary-color);
  font-size: var(--font-size);

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-size) * var(--font-tablet-scale));
  }
`;
Title.displayName = "Title";

const TaskLimit = styled.span`
  --height: 20px;

  display: flex;
  gap: 5px;
  height: var(--height);

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-size) * var(--font-tablet-scale));
    height: calc(var(--height) * var(--font-tablet-scale));
  }
`;
TaskLimit.displayName = "TaskLimit";

const TaskLimitContainer = styled.div`
  display: flex;
  align-items: center;
`;
TaskLimitContainer.displayName = "TaskLimitContainer";

const Drag = styled(ButtonStyled)`
  position: absolute;
  right: 0;
  width: 50px;

  &:hover {
    color: unset;
    background-color: unset;
  }
`;
Drag.displayName = "Drag";

export default function StageOverview({
  stageTasksShown,
  setStageTasksShown,
  showStageDetails,
  tasksList,
  tasksLimit,
  title,
  drag,
}) {
  return (
    <StageOverviewStyled>
      <DropDownBtnStyled
        onClick={() =>
          stageTasksShown ? setStageTasksShown(false) : setStageTasksShown(true)
        }
      >
        <ArrowDropDown isFolded={stageTasksShown} />
      </DropDownBtnStyled>
      <Container onClick={showStageDetails}>
        <Title className="stage__title">{title}</Title>
        {tasksList.length > 0 ? (
          <TaskLimit>
            {taskAltIcon}
            <TaskLimitContainer>
              {tasksList.length}
              {tasksLimit ? `/ ${tasksLimit}` : ""}
            </TaskLimitContainer>
          </TaskLimit>
        ) : null}
      </Container>
      <Drag ref={drag}>{dragIndicatorIcon}</Drag>
    </StageOverviewStyled>
  );
}
