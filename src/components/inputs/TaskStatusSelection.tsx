import styled from "styled-components";
import Select from "./Select";

const SelectStyled = styled(Select)`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  transition: all 0.3s ease;

  color: var(--contrast-primary-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--contrast-primary-color);
  }
`;
SelectStyled.displayName = "SelectStyled";

export default function TaskStatusSelection({ register }) {
  const options = ["in progress", "needs review", "done"];

  return <SelectStyled register={register} options={options} />;
}
