import TaskDetails from "./TaskDetails";
import styled from "styled-components";
import { useState } from "react";
import StageDetails from "./StageDetails";
import { logOffIcon, stageAddIcon, taskAddIcon } from "../assets/svg_icons";
import { useNavigate } from "react-router";
import ButtonStyled from "./styled/ButtonStyled";

const MenuMobileStyled = styled.li`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: space-around;
  width: 100%;
  padding: 15px;
  background-color: #fefefe;
`;
MenuMobileStyled.displayName = "MenuMobileStyled";

const MenuBtn = styled(ButtonStyled)`
  width: 50px;
  color: #1b1b1b;
  border-radius: 10px;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;
MenuBtn.displayName = "MenuBtn";

export default function MenuMobile() {
  const [stageDetailsShown, setStageDetailsShown] = useState(false);
  const [taskDetailsShown, setTaskDetailsShown] = useState(false);
  const navigate = useNavigate();

  return (
    <MenuMobileStyled>
      <MenuBtn onClick={() => navigate("/")}>{logOffIcon}</MenuBtn>
      <MenuBtn onClick={() => setTaskDetailsShown(true)}>{taskAddIcon}</MenuBtn>
      <MenuBtn onClick={() => setStageDetailsShown(true)}>
        {stageAddIcon}
      </MenuBtn>

      {stageDetailsShown ? (
        <StageDetails setStageDetailsShown={setStageDetailsShown} />
      ) : null}

      {taskDetailsShown ? (
        <TaskDetails setTaskDetailsShown={setTaskDetailsShown} />
      ) : null}
    </MenuMobileStyled>
  );
}
