import SelectStyled from "../styled/SelectStyled";
import ButtonStyled from "../styled/ButtonStyled";
import { useState, useRef } from "react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectFluidProps = {
  getSelectValue: () => string;
  selectOptions: string[];
  register: UseFormRegisterReturn<string>;
};

const SelectFluidBtn = styled(ButtonStyled)`
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

SelectFluidBtn.displayName = "SelectFluidBtn";

export default function SelectFluid({
  getSelectValue,
  selectOptions,
  register,
}: SelectFluidProps) {
  const [editState, setEditState] = useState(false);

  const selectRef = useRef();

  const { ref: registeredEleRef, ...registerWithoutRef } = register;

  const combineRefs = (node) => {
    selectRef.current = node;
    registeredEleRef(node);
  };

  return (
    <div>
      <SelectFluidBtn
        $isShown={!editState}
        onClick={() => {
          setTimeout(() => selectRef.current.focus(), 0);
          setEditState(true);
        }}
      >
        {getSelectValue()}
      </SelectFluidBtn>

      <SelectStyled
        ref={combineRefs}
        $isShown={editState}
        register={registerWithoutRef}
        optionsList={selectOptions}
        onBlur={(evt) => {
          evt.preventDefault();
          setEditState(false);
        }}
      />
    </div>
  );
}
