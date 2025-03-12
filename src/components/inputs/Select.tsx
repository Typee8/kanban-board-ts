import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectProps = {
  $isShown: boolean;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  id?: string;
  register: Omit<UseFormRegisterReturn<string>, "ref">;
  optionsList: string[];
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, register, children, id, onBlur }, ref) => {
    /*     const optionsJSX = optionsList.map((ele: string) => (
      <option key={ele}>{ele}</option>
    )); */

    return (
      <select
        ref={ref}
        id={id}
        className={className}
        {...register}
        onBlur={onBlur}
      >
        {children}
      </select>
    );
  }
);

export default Select;
