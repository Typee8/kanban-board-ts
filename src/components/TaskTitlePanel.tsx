import InputFluid from "./inputs/InputFluid";

export default function TaskTitlePanel({ getTitle, taskRegister }) {
  return <InputFluid getSelectValue={getTitle} register={taskRegister} />;
}
