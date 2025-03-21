import { UseFormRegisterReturn } from "react-hook-form";
import InputStyled from "./styled/InputStyled";
import styled from "styled-components";
import { checkIcon, personAddIcon } from "../assets/svg_icons";
import { v4 as uuidv4 } from "uuid";
import ButtonStyled from "./styled/ButtonStyled";
import DetailsLabelStyled from "./styled/DetailsLabelStyled";

type AddTaskAssigneeProps = {
  append: () => void;
  register: UseFormRegisterReturn;
};

const FormFieldArrayInputStyled = styled.li`
  display: flex;
  gap: 10px;
  height: 50px;
`;
FormFieldArrayInputStyled.displayName = "FormFieldArrayInputStyled";

const Input = styled(InputStyled)`
  width: 65%;
`;
Input.displayName = "Input";

const Btn = styled(ButtonStyled)`
  min-width: 50px;
  border-radius: 10px;
`;
Btn.displayName = "Btn";

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
      <DetailsLabelStyled htmlFor={id}>{title}</DetailsLabelStyled>
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
