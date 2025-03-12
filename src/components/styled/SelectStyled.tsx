import styled from "styled-components";
import Select from "../inputs/Select";

export const SelectStyled = styled(Select)`
  border: none;
  background: none;
  border-radius: 20px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  display: ${(props) =>
    props.$isShown || props.$isShown === undefined ? "initial" : "none"};

  &:hover {
    background-color: #fefefe;
  }
`;
