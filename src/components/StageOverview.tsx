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
  padding: 20px 30px;
  border-radius: 20px 0px;
  margin: -3px -3px 0px -3px;
  cursor: pointer;
  color: var(--contrast-primary-color);
  transition: all 0.3s ease;

  @media (min-width: ${`${tablet}px`}) {
    &:hover:not(:active) {
      > * {
        color: var(--primary-color);
      }

      background-color: var(--contrast-primary-color);
    }
  }
`;
StageOverviewStyled.displayName = "StageOverviewStyled";

const DropDownBtnStyled = styled(ButtonStyled)`
  min-width: 50px;

  &:hover {
    color: unset;
    background: none;
  }

  @media (min-width: ${`${tablet}px`}) {
    display: none;
  }
`;
DropDownBtnStyled.displayName = "DropDownBtnStyled";

const Title = styled.h2`
  --font-size: 20px;
  font-weight: 600;
  color: var(--contrast-primary-color);
  font-size: var(--font-size);
  padding-right: 30px;
  overflow: hidden;
  word-wrap: break-word;

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-size) * var(--font-tablet-scale));
  }
`;
Title.displayName = "Title";

const TaskLimit = styled.span`
  --height: 20px;

  display: flex;
  gap: 5px;
  min-width: 60px;
  height: var(--height);
  margin-right: 40px;
  color: ${(props) => props.$maxTasks && "var(--highlight-secondary-color)"};

  @media (min-width: ${`${tablet}px`}) {
    font-size: calc(var(--font-size) * var(--font-tablet-scale));
    height: calc(var(--height) * var(--font-tablet-scale));
  }
`;
TaskLimit.displayName = "TaskLimit";

const TaskLimitContainer = styled.div`
  min-width: 40px;
`;
TaskLimitContainer.displayName = "TaskLimitContainer";

const Drag = styled(ButtonStyled)`
  position: absolute;
  top: auto;
  right: 5px;
  padding: 0px;
  margin-left: auto;
  justify-self: flex-end;
  touch-action: none !important;

  &:hover {
    background-color: unset;
  }

  @media (min-width: ${`${tablet}px`}) {
    right: 0px;
  }
`;
Drag.displayName = "Drag";

export default function StageOverview({
  stageId,
  stageTasksShown,
  setStageTasksShown,
  showStageDetails,
  tasksList,
  tasksLimit,
  title,
  dragAttributes,
  dragListeners,
}) {
  return (
    <StageOverviewStyled onClick={showStageDetails}>
      <DropDownBtnStyled
        onClick={(evt) => {
          evt.stopPropagation();

          return stageTasksShown
            ? setStageTasksShown(false)
            : setStageTasksShown(true);
        }}
      >
        <ArrowDropDown isFolded={stageTasksShown} />
      </DropDownBtnStyled>
      <Title className="stage__title">{title}</Title>
      {tasksList.length > 0 ? (
        <TaskLimit $maxTasks={tasksList.length >= tasksLimit}>
          {taskAltIcon}
          <TaskLimitContainer>
            {tasksList.length}
            {tasksLimit ? `/ ${tasksLimit}` : ""}
          </TaskLimitContainer>
        </TaskLimit>
      ) : null}
      {!(stageId === "firstStage" || stageId === "lastStage") && (
        <Drag {...dragAttributes} {...dragListeners}>
          {dragIndicatorIcon}
        </Drag>
      )}
    </StageOverviewStyled>
  );
}
