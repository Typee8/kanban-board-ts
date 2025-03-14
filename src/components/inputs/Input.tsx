import { forwardRef } from "react";

type InputProps = {
  className?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  register: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autocomplete?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      id,
      type,
      placeholder,
      register,
      onFocus,
      onBlur,
      autocomplete,
    },
    ref
  ) => {
    return (
      <input
        autoComplete={autocomplete}
        id={id}
        ref={ref}
        type={type}
        className={className}
        {...register}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    );
  }
);

export default Input;
