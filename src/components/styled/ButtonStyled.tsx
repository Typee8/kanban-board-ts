import Button from "../buttons/Button";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
  border: none;
  border-radius: 10px;
  background: none;
  min-width: 40px;
  padding: 10px;
  transition: all 0.3s ease;

  display: ${(props) =>
    props.$isShown === true || props.$isShown === undefined
      ? "initial"
      : "none"};

  color: var(--contrast-primary-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--contrast-primary-color);
  }
`;

export default ButtonStyled;
