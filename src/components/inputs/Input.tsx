import { v4 as uuidv4 } from "uuid";

type inputProps = {
  className?: string;
  title?: string;
  inputType?: string;
  register: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export default function Input({
  className,
  title,
  inputType,
  register,
  onFocus,
  onBlur,
}: inputProps) {
  const id = uuidv4();
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input
        id={id}
        type={inputType}
        className={className}
        {...register}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
}
