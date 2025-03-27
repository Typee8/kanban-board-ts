import Button from "../buttons/Button";
import styled from "styled-components";
import { tablet } from "../../devicesWidthStandard";

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  @media (min-width: ${`${tablet}px`}) {
    &:hover:not(:disabled) {
      color: var(--secondary-color);
      background-color: var(--contrast-primary-color);
    }
  }
`;

export default ButtonStyled;
