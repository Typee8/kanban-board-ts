import ButtonStyled from "./ButtonStyled";
import styled from "styled-components";

const ToolbarBtn = styled(ButtonStyled)`
  width: 50px;
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;
ToolbarBtn.displayName = "ToolbarBtn";

export default ToolbarBtn;
