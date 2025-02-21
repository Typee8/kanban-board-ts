import InputStyled from "../styled/InputStyled";
import ButtonStyled from "../styled/ButtonStyled";
import { useState, useRef } from "react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

type InputFluidProps = {
  getSelectValue: () => string;
  register: UseFormRegisterReturn<string>;
};

const InputFluidBtn = styled(ButtonStyled)`
  background: none;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #cccccc;
    transform: scale(1.1);
  }
`;

InputFluidBtn.displayName = "InputFluidBtn";

InputFluid.btn = InputFluidBtn;
InputFluid.input = InputStyled;

export default function InputFluid({
  getSelectValue,
  register,
}: InputFluidProps) {
  const [editState, setEditState] = useState(false);

  const inputRef = useRef();

  const { ref: registeredEleRef, ...registerWithoutRef } = register;

  const combineRefs = (node) => {
    inputRef.current = node;
    registeredEleRef(node);
  };

  return (
    <div>
      <InputFluidBtn
        $isShown={!editState}
        onClick={() => {
          setTimeout(() => inputRef.current.focus(), 0);
          setEditState(true);
        }}
      >
        {getSelectValue()}
      </InputFluidBtn>

      <InputStyled
        ref={combineRefs}
        $isShown={editState}
        register={registerWithoutRef}
        onBlur={(evt) => {
          evt.preventDefault();
          setEditState(false);
        }}
      />
    </div>
  );
}
