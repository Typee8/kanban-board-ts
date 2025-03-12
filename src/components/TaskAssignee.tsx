import { UseFormRegisterReturn } from "react-hook-form";
import ButtonStyled from "./styled/ButtonStyled";
import { SelectStyled } from "./styled/SelectStyled";
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
      <SelectStyled
        getSelectValue={getValue}
        selectOptions={availableAssignees}
        register={register}
      />
      <ButtonStyled onClick={removeAssignee}>X</ButtonStyled>
    </TaskAssigneeStyled>
  );
}
