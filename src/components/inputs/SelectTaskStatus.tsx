import styled from "styled-components";
import Select from "./Select";

const SelectStyled = styled(Select)`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  transition: all 0.3s ease;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;

export default function SelectTaskStatus({ register }) {
  const options = ["in progress", "needs review", "done"];

  return <SelectStyled register={register} options={options} />;
}
