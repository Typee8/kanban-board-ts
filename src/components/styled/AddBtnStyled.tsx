import AddBtn from "../buttons/AddBtn";
import styled from "styled-components";

const AddBtnStyled = styled(AddBtn)`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;

export default AddBtnStyled;
