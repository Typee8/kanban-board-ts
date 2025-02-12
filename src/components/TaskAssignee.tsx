import { useState, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import SelectStyled from "./styled/SelectStyled";
import ButtonStyled from "./styled/ButtonStyled";

type TaskAssigneeProps = {
  getName: () => string;
  availableAssignees: string[];
  register: UseFormRegisterReturn;
};

export default function TaskAssignee({
  removeAssignee,
  getName,
  availableAssignees,
  register,
}: TaskAssigneeProps) {
  const [selectBtnShown, setSelectBtnShown] = useState(true);
  const [selectShown, setSelectShown] = useState(false);

  const selectRef = useRef();

  const { ref: registerRef, ...restOfRegister } = register;

  const combineRefs = (node) => {
    selectRef.current = node;
    registerRef(node);
  };

  return (
    <li>
      <ButtonStyled
        $isShown={selectBtnShown}
        onClick={() => {
          setTimeout(() => selectRef.current.focus(), 0);
          setSelectBtnShown(false);
          setSelectShown(true);
        }}
      >
        {getName()}
      </ButtonStyled>

      <SelectStyled
        ref={combineRefs}
        $isShown={selectShown}
        register={restOfRegister}
        optionsList={availableAssignees}
        onBlur={(evt) => {
          evt.preventDefault();
          setSelectBtnShown(true);
          setSelectShown(false);
        }}
      />

      <ButtonStyled $isShown={selectBtnShown} onClick={removeAssignee}>
        X
      </ButtonStyled>
    </li>
  );
}
