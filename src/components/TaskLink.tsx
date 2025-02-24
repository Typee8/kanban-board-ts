import { UseFormRegisterReturn } from "react-hook-form";
import InputFluid from "./inputs/InputFluid";
import ButtonStyled from "./styled/ButtonStyled";

type TaskLinkProps = {
  getValue: () => string;
  availableAssignees: string[];
  register: UseFormRegisterReturn<string>;
};

export default function TaskLink({
  removeLink,
  getValue,
  register,
}: TaskLinkProps) {
  return (
    <li>
      <InputFluid getInputValue={getValue} register={register} />
      <ButtonStyled onClick={removeLink}>X</ButtonStyled>
    </li>
  );
}
