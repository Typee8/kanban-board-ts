import styled from "styled-components";
import Input from "../inputs/Input";

const InputStyled = styled(Input)`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  display: ${(props) =>
    props.$isShown === true || props.$isShown === undefined
      ? "initial"
      : "none"};

  color: var(--contrast-primary-color);
  &:hover,
  &:focus {
    background-color: var(--secondary-color);
  }
`;
InputStyled.displayName = "InputStyled";

export default InputStyled;
