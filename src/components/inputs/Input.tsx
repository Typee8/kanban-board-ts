import { v4 as uuidv4 } from "uuid";
import { forwardRef } from "react";

type InputProps = {
  $isShown?: boolean;
  className?: string;
  title?: string;
  type?: string;
  placeholder?: string;
  register: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, title, type, placeholder, register, onFocus, onBlur }, ref) => {
    const id = uuidv4();
    return (
      <>
        {title ? <label htmlFor={id}>{title}</label> : null}
        <input
          id={id}
          ref={ref}
          type={type}
          className={className}
          {...register}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </>
    );
  }
);

export default Input;
