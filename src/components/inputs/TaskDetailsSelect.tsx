import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const TaskDetailsSelectStyled = styled.div`
  display: flex;
  padding-left: 20px;
  gap: 10px;
`;
TaskDetailsSelectStyled.displayName = "TaskDetailsSelectStyled";

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;

  > * {
    width: 40px;
  }
`;
Label.displayName = "Label";

const Select = styled.select`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fefefe;
  }
`;
Select.displayName = "Select";

export default function TaskDetailsSelect({ register, options, title }) {
  const id = uuidv4();
  const optionsJSX = options.map((ele: string) => (
    <option key={ele} value={ele}>
      {ele}
    </option>
  ));

  return (
    <TaskDetailsSelectStyled>
      <Label htmlFor={id}>{title}</Label>
      <Select id={id} {...register}>
        {optionsJSX}
      </Select>
    </TaskDetailsSelectStyled>
  );
}
