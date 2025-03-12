import { v4 as uuidv4 } from "uuid";
import { forwardRef } from "react";

type InputProps = {
  $isShown?: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
  register: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, register, onFocus, onBlur }, ref) => {
    const id = uuidv4();
    return (
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
    );
  }
);

export default Input;
