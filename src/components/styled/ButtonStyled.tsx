import Button from "../buttons/Button";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
  display: ${(props) =>
    props.$isShown === true || props.$isShown === undefined
      ? "initial"
      : "none"};
`;

export default ButtonStyled;
