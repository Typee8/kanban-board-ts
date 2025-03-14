import { UseFormRegisterReturn } from "react-hook-form";
import { InputStyled } from "./styled/InputStyled";
import styled from "styled-components";
import { checkIcon, personAddIcon } from "../assets/svg_icons";
import { v4 as uuidv4 } from "uuid";
import ButtonStyled from "./styled/ButtonStyled";

type AddTaskAssigneeProps = {
  addAssignee: () => void;
  register: UseFormRegisterReturn;
};

const AddTaskAssigneeStyled = styled.li`
  display: flex;
  gap: 10px;
  height: 50px;
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

const AddTaskAssigneeInput = styled(InputStyled)`
  font-size: 16px;
  width: 65%;
`;

const AddTaskAssigneeBtn = styled(ButtonStyled)`
  min-width: 50px;
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;

export default function AddTaskAssignee({
  addAssignee,
  resetInput,
  register,
  checkInputLength,
}: AddTaskAssigneeProps) {
  const id = uuidv4();

  return (
    <AddTaskAssigneeStyled>
      <LabelStyled htmlFor={id}>{personAddIcon}</LabelStyled>
      <AddTaskAssigneeInput
        id={id}
        register={register}
        placeholder="new assignee..."
      />
      {checkInputLength() > 0 ? (
        <AddTaskAssigneeBtn
          onClick={() => {
            addAssignee();
            resetInput();
          }}
        >
          {checkIcon}
        </AddTaskAssigneeBtn>
      ) : null}
    </AddTaskAssigneeStyled>
  );
}
