import { v4 as uuidv4 } from "uuid";
import { taskIcon } from "../../assets/svg_icons";
import styled from "styled-components";

const SelectTasksLimitStyled = styled.div`
  display: flex;
  padding-left: 20px;
  gap: 10px;
`;

const LabelStyled = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;

  > * {
    width: 40px;
  }
`;

const SelectStyled = styled.select`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px 20px;
  width: 70px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fefefe;
  }
`;

export default function SelectTasksLimit({ register, options }) {
  const id = uuidv4();
  const optionsJSX = options.map((ele: string) => (
    <option key={ele}>{ele}</option>
  ));

  return (
    <SelectTasksLimitStyled>
      <LabelStyled htmlFor={id}>
        {taskIcon}
        Limit:
      </LabelStyled>
      <SelectStyled id={id} {...register}>
        {optionsJSX}
      </SelectStyled>
    </SelectTasksLimitStyled>
  );
}
