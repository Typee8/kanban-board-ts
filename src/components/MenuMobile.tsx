import TaskDetails from "./TaskDetails";
import styled from "styled-components";
import { useState } from "react";
import StageDetails from "./StageDetails";
import { logOffIcon, stageAddIcon, taskAddIcon } from "../assets/svg_icons";
import { useNavigate } from "react-router";
import ButtonStyled from "./styled/ButtonStyled";
import { tablet } from "../devicesWidthStandard.tsx";
import { useSelector } from "react-redux";

const MenuMobileStyled = styled.li`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: space-around;
  width: 100%;
  padding: 15px;
  background-color: var(--secondary-color);

  @media (min-width: ${`${tablet}px`}) {
    display: none;
  }
`;
MenuMobileStyled.displayName = "MenuMobileStyled";

const MenuBtn = styled(ButtonStyled)`
  width: 50px;
  border-radius: 10px;
`;
MenuBtn.displayName = "MenuBtn";

export default function MenuMobile() {
  const { data: boardData } = useSelector((state) => state.boardState);
  const [stageDetailsShown, setStageDetailsShown] = useState(false);
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);
  const navigate = useNavigate();

  const doesTasksLimitExceed = boardData.find((stage) => {
    if (stage.id === "firstStage") {
      const tasksNumber = stage?.tasksList ? stage.tasksList.length : 0;
      const { tasksLimit } = stage;
      return tasksNumber >= tasksLimit;
    }
    return false;
  });

  return (
    <MenuMobileStyled>
      <MenuBtn onClick={() => navigate("/")}>{logOffIcon}</MenuBtn>
      <MenuBtn
        disabled={doesTasksLimitExceed}
        onClick={() => setTaskDetailsShown(true)}
      >
        {taskAddIcon}
      </MenuBtn>
      <MenuBtn onClick={() => setStageDetailsShown(true)}>
        {stageAddIcon}
      </MenuBtn>

      {stageDetailsShown ? (
        <StageDetails hideStageDetails={() => setStageDetailsShown(false)} />
      ) : null}

      {taskDetailsShown ? (
        <TaskDetails hideTaskDetails={() => setTaskDetailsShown(false)} />
      ) : null}
    </MenuMobileStyled>
  );
}
