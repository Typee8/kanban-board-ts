import { InputStyled } from "./styled/InputStyled";

export default function TaskTitlePanel({ getTitle, taskRegister }) {
  return <InputStyled getInputValue={getTitle} register={taskRegister} />;
}
