import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import InputStyled from "../styled/InputStyled";

const TaskDetailsInputStyled = styled.div`
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

export default function TaskDetailsInput({ register, title }) {
  const id = uuidv4();

  return (
    <TaskDetailsInputStyled>
      <LabelStyled htmlFor={id}>{title}</LabelStyled>
      <InputStyled id={id} {...register} />
    </TaskDetailsInputStyled>
  );
}
