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
  ({ className, options, register, id, onBlur }, ref) => {
    const optionsJSX = options.map((ele: string) => (
      <option key={ele} value={ele}>
        {ele}
      </option>
    ));

    return (
      <select
        ref={ref}
        id={id}
        className={className}
        {...register}
        onBlur={onBlur}
      >
        {optionsJSX}
      </select>
    );
  }
);

export default Select;
