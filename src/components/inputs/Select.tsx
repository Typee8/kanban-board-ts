import { v4 as uuidv4 } from "uuid";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectProps = {
  className?: string;
  title?: string;
  defaultValue?: string;
  register: UseFormRegisterReturn;
  optionsList: string[];
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
};

function Select({
  className,
  title,
  register,
  optionsList,
  onBlur,
}: SelectProps) {
  const id = uuidv4();

  const optionsJSX = optionsList.map((ele: string) => (
    <option key={ele}>{ele}</option>
  ));

  return (
    <>
      {title ? <label htmlFor={id}>{title}</label> : null}
      <select id={id} className={className} {...register} onBlur={onBlur}>
        {optionsJSX}
      </select>
    </>
  );
}

export default Select;
