import { useState, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { SelectStyled } from "./styled/SelectStyled";
import AddBtnStyled from "./styled/AddBtnStyled";

type AddTaskAssigneeProps = {
  addAssignee: () => void;
  availableAssignees: string[];
  register: UseFormRegisterReturn;
};

export default function AddTaskAssignee({
  addAssignee,
  availableAssignees,
  register,
}: AddTaskAssigneeProps) {
  const [addBtnShown, setAddBtnShown] = useState(true);
  const [selectShown, setSelectShown] = useState(false);

  const selectRef = useRef();

  const { ref: registerRef, ...restOfRegister } = register;

  const combineRefs = (node) => {
    selectRef.current = node;
    registerRef(node);
  };

  return (
    <li>
      <AddBtnStyled
        $isShown={addBtnShown}
        onClick={() => {
          setTimeout(() => selectRef.current.focus(), 0);
          setAddBtnShown(false);
          setSelectShown(true);
        }}
      />

      <SelectStyled
        $isShown={selectShown}
        ref={combineRefs}
        register={restOfRegister}
        optionsList={availableAssignees}
        onBlur={(evt) => {
          evt.preventDefault();
          addAssignee();
          setAddBtnShown(true);
          setSelectShown(false);
        }}
      />
    </li>
  );
}
