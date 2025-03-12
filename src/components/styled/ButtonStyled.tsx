import Button from "../buttons/Button";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
  border: none;
  border-radius: 120px;
  background: none;
  width: 40px;
  padding: 10px;
  transition: all 0.3s ease;

  display: ${(props) =>
    props.$isShown === true || props.$isShown === undefined
      ? "initial"
      : "none"};
`;

export default ButtonStyled;
