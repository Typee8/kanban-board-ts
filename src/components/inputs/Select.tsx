import { v4 as uuidv4 } from "uuid";

type SelectProps = {
  className?: string;
  title?: string;
  register: any;
  optionsList: string[];
};

export default function Select({
  className,
  title,
  register,
  optionsList,
}: SelectProps) {
  const id = uuidv4();

  const optionsJSX = optionsList.map((ele: string) => (
    <option key={ele}>{ele}</option>
  ));

  return (
    <>
      {title ? <label htmlFor={id}>{title}</label> : null}
      <select id={id} className={className} {...register}>
        {optionsJSX}
      </select>
    </>
  );
}
