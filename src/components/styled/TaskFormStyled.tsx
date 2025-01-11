import styled from "styled-components";
import Form from "../forms/Form";

const TaskFormStyled = styled(Form)`
  z-index: 999;
  position: absolute;
  top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 800px;
  height: 800px;
  padding: 20px 60px;
  border-radius: 60px;
  background-color: blanchedalmond;
`;

TaskFormStyled.displayName = "TaskFormStyled";

export default TaskFormStyled;
