import TextArea from "../inputs/TextArea";
import styled from "styled-components";

const TextAreaStyled = styled(TextArea)`
  display: ${(props) =>
    props.$isShown === true || props.$isShown === undefined
      ? "initial"
      : "none"};
`;

export default TextAreaStyled;
