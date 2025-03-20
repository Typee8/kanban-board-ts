import { ReactNode } from "react";
import ButtonStyled from "../styled/ButtonStyled";
import { crossIcon } from "../../assets/svg_icons";

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
  title,
  onSubmit,
  closeForm,
}: FormProps) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {closeForm ? (
        <ButtonStyled
          onClick={(evt) => {
            evt.preventDefault();
            closeForm();
          }}
        >
          {crossIcon}
        </ButtonStyled>
      ) : null}

      {title ? <h3>{title}</h3> : null}
      {children}
    </form>
  );
}
