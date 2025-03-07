import { ReactNode } from "react";
import ButtonStyled from "../styled/ButtonStyled";
import styled from "styled-components";

const FormStyled = styled.form`
  z-index: 999;
  position: absolute;
  top: 200px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  width: 800px;
  padding: 20px 60px;
  border-radius: 60px;
  background-color: blanchedalmond;
`;
FormStyled.displayName = "FormStyled";

const CloseBtnStyled = styled(ButtonStyled)`
  position: absolute;
  align-self: flex-end;
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
      <CloseBtnStyled
        onClick={(evt) => {
          evt.preventDefault();
          closeForm();
        }}
      >
        X
      </CloseBtnStyled>

      {title ? <h3>{title}</h3> : null}
      {children}
      <input type="submit" />
    </FormStyled>
  );
}
