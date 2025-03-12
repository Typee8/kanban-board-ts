import { ReactNode } from "react";
import styled from "styled-components";
import CloseIcon from "../icons/CloseIcon";

const FormStyled = styled.form`
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
`;
FormStyled.displayName = "FormStyled";

const SubmitStyled = styled.input`
  margin-top: auto;
`;

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
    <FormStyled className={className} onSubmit={onSubmit}>
      {closeForm ? (
        <CloseIcon
          onClick={(evt) => {
            evt.preventDefault();
            closeForm();
          }}
        />
      ) : null}

      {title ? <h3>{title}</h3> : null}
      {children}
      <SubmitStyled type="submit" />
    </FormStyled>
  );
}
