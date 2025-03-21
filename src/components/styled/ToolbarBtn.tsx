import ButtonStyled from "./ButtonStyled";
import styled from "styled-components";

const ToolbarBtn = styled(ButtonStyled)`
  width: 50px;
  border-radius: 10px;

  &:hover {
    & * {
      color: var(--secondary-color);
    }

    background-color: var(--contrast-primary-color);
  }
`;
ToolbarBtn.displayName = "ToolbarBtn";

export default ToolbarBtn;
