import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import InputStyled from "../styled/InputStyled";
import DetailsLabelStyled from "../styled/DetailsLabelStyled";

const TaskDetailsInputStyled = styled.div`
  display: flex;
  padding-left: 20px;
  gap: 10px;
`;

export default function TaskDetailsInput({ register, title }) {
  const id = uuidv4();

  return (
    <TaskDetailsInputStyled>
      <DetailsLabelStyled htmlFor={id}>{title}</DetailsLabelStyled>
      <InputStyled id={id} {...register} />
    </TaskDetailsInputStyled>
  );
}
