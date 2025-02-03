import { ReactNode } from "react";
import CloseBtn from "../buttons/CloseBtn";
import FormStyled from "../styled/FormStyled";

FormStyled.displayName = "FormStyled";

type FormProps = {
  children: ReactNode;
  className?: string;
  title?: string | boolean;
  onSubmit: () => (event: React.FormEvent<HTMLFormElement>) => void;
  closeForm?: React.Dispatch<React.SetStateAction<boolean>> | boolean;
};

export default function Form({
  children,
  className,
  title = false,
  onSubmit,
  closeForm = false,
}: FormProps) {
  return (
    <FormStyled className={className} onSubmit={onSubmit}>
      {closeForm ? (
        <CloseBtn
          onClick={(evt) => {
            evt.preventDefault();
            closeForm();
          }}
        />
      ) : null}

      {title ? <h3>{title}</h3> : null}
      {children}
      <input type="submit" />
    </FormStyled>
  );
}
