import Button from "../buttons/Button";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;

export default ButtonStyled;
