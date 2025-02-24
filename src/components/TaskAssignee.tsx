import { UseFormRegisterReturn } from "react-hook-form";
import ButtonStyled from "./styled/ButtonStyled";
import SelectFluid from "./inputs/SelectFluid";
import styled from "styled-components";

type TaskAssigneeProps = {
  getValue: () => string;
  availableAssignees: string[];
  register: UseFormRegisterReturn<string>;
};

const TaskAssigneeStyled = styled.li`
  display: flex;
`;

export default function TaskAssignee({
  removeAssignee,
  getValue,
  availableAssignees,
  register,
}: TaskAssigneeProps) {
  return (
    <TaskAssigneeStyled>
      <SelectFluid
        getSelectValue={getValue}
        selectOptions={availableAssignees}
        register={register}
      />
      <ButtonStyled onClick={removeAssignee}>X</ButtonStyled>
    </TaskAssigneeStyled>
  );
}
