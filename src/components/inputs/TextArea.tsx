import { v4 as uuidv4 } from "uuid";
import { forwardRef } from "react";

type TextAreaProps = {
  className?: string;
  title?: string;
  placeholder?: string;
  register?: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, title, placeholder, register, onFocus, onBlur }, ref) => {
    const id = uuidv4();
    return (
      <>
        {title ? <label htmlFor={id}>{title}</label> : null}
        <textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          className={className}
          {...register}
          {...register}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </>
    );
  }
);

export default TextArea;
