import { UseFormRegisterReturn } from "react-hook-form";
import { InputStyled } from "./styled/InputStyled";
import styled from "styled-components";
import { checkIcon, personAddIcon } from "../assets/svg_icons";
import { v4 as uuidv4 } from "uuid";
import ButtonStyled from "./styled/ButtonStyled";

type AddTaskAssigneeProps = {
  append: () => void;
  register: UseFormRegisterReturn;
};

const FormFieldArrayInputStyled = styled.li`
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

const Input = styled(InputStyled)`
  font-size: 16px;
  width: 65%;
`;

const Btn = styled(ButtonStyled)`
  min-width: 50px;
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;

export default function FormFieldArrayInput({
  append,
  resetInput,
  register,
  title,
  placeholder,
  checkInputLength,
}: AddTaskAssigneeProps) {
  const id = uuidv4();

  return (
    <FormFieldArrayInputStyled>
      <LabelStyled htmlFor={id}>{title}</LabelStyled>
      <Input id={id} register={register} placeholder={placeholder} />
      {checkInputLength() > 0 ? (
        <Btn
          onClick={() => {
            append();
            resetInput();
          }}
        >
          {checkIcon}
        </Btn>
      ) : null}
    </FormFieldArrayInputStyled>
  );
}
