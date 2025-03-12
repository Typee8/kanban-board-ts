import { ReactNode } from "react";
import styled from "styled-components";
import ButtonStyled from "../styled/ButtonStyled";
import { crossIcon } from "../../assets/svg_icons";

const FormStyled = styled.form`
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f3f3f3;
`;
FormStyled.displayName = "FormStyled";

const SubmitStyled = styled.input`
  align-self: center;
  border: none;
  border-radius: 10px;
  background-color: #fefefe;
  padding: 10px 20px;
  margin-top: auto;
  transition: all 0.2s ease;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
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
      <SubmitStyled type="submit" value="Dodaj" />
    </FormStyled>
  );
}
