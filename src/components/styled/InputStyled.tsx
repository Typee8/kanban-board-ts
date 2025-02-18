import Input from "../inputs/Input";
import styled from "styled-components";

const InputStyled = styled(Input)`
  display: ${(props) =>
    props.$isShown === true || props.$isShown === undefined
      ? "initial"
      : "none"};
`;

export default InputStyled;
