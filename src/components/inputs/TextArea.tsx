import { forwardRef } from "react";

type TextAreaProps = {
  className?: string;
  id?: string;
  placeholder?: string;
  register?: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, id, placeholder, register, onFocus }, ref) => {
    return (
      <textarea
        id={id}
        className={className}
        placeholder={placeholder}
        onFocus={onFocus}
        {...register}
        ref={ref}
      />
    );
  }
);

export default TextArea;
