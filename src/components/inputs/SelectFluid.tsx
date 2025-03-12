import styled from "styled-components";
import Select from "./Select";

const SelectStyled = styled(Select)`
  border: none;
  background: none;
  border-radius: 20px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fefefe;
  }
`;

export default function SelectFluid({ register, title, optionsList }) {
  return <SelectStyled {...register} title={title} optionsList={optionsList} />;
}
