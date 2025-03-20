import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import ArrowDropDown from "./icons/ArrowDropDown";
import { taskAltIcon, dragIndicatorIcon } from "../assets/svg_icons";

const StageOverviewStyled = styled.div`
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
StageOverviewStyled.displayName = "StageOverviewStyled";

const DropDownBtnStyled = styled(ButtonStyled)`
  width: 60px;
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
  font-weight: 600;
  margin-right: 20px;
`;
Title.displayName = "Title";

const TaskLimit = styled.span`
  display: flex;
  gap: 5px;
  height: 20px;
`;
TaskLimit.displayName = "TaskLimit";

const Drag = styled(ButtonStyled)`
  position: absolute;
  right: 0;
  width: 50px;
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
            {tasksList.length}
            {tasksLimit ? `/ ${tasksLimit}` : ""}
          </TaskLimit>
        ) : null}
      </Container>
      <Drag ref={drag}>{dragIndicatorIcon}</Drag>
    </StageOverviewStyled>
  );
}
