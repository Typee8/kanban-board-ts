import { v4 as uuidv4 } from "uuid";
import { UseFormRegisterReturn } from "react-hook-form";
import { forwardRef } from "react";

type SelectProps = {
  className?: string;
  title?: string;
  register: UseFormRegisterReturn;
  optionsList: string[];
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, title, register, optionsList, onBlur }, ref) => {
    const id = uuidv4();

    const { ref: registerRef, ...restOfRegister } = register;

    const combineRefs = (node) => {
      if (ref) ref.current = node;
      registerRef(node);
    };

    const optionsJSX = optionsList.map((ele: string) => (
      <option key={ele}>{ele}</option>
    ));

    return (
      <>
        {title ? <label htmlFor={id}>{title}</label> : null}
        <select
          ref={combineRefs}
          id={id}
          className={className}
          {...restOfRegister}
          onBlur={onBlur}
        >
          {optionsJSX}
        </select>
      </>
    );
  }
);

export default Select;
