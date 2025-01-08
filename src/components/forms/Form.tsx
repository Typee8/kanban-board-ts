import CloseBtn from "../buttons/CloseBtn";
import styled from "styled-components";

const FormStyled = styled.form`
  z-index: 999;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  gap: 20px;
  background-color: blanchedalmond;
  border-radius: 40px;
`;

export default function Form({
  children,
  className,
  title,
  onSubmit,
  closeForm,
}) {
  return (
    <FormStyled className={className} onSubmit={onSubmit}>
      <CloseBtn
        onClick={(evt) => {
          evt.preventDefault();
          closeForm();
        }}
      />
      <h3>{title}</h3>
      {children}
      <input type="submit" />
    </FormStyled>
  );
}
