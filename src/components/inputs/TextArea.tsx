import { v4 as uuidv4 } from "uuid";
import { forwardRef } from "react";

type TextAreaProps = {
  $isShown: boolean;
  className?: string;
  title?: string;
  register?: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, title, register, onFocus, onBlur }, ref) => {
    const id = uuidv4();
    return (
      <>
        {title ? <label htmlFor={id}>{title}</label> : null}
        <textarea
          ref={ref}
          id={id}
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
