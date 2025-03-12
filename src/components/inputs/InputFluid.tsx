import styled from "styled-components";
import Input from "./Input";

const InputStyled = styled(Input)`
  border: none;
  background: none;
  border-radius: 20px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fefefe;
  }
`;

export default function InputFluid({ register, placeholder }) {
  return <InputStyled {...register} placeholder={placeholder} />;
}
