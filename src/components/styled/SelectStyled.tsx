import Select from "../inputs/Select";
import styled from "styled-components";

const SelectStyled = styled(Select)`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;

export default SelectStyled;
