import InputFluid from "./inputs/InputFluid";

export default function TaskTitlePanel({ getTitle, taskRegister }) {
  return <InputFluid getInputValue={getTitle} register={taskRegister} />;
}
