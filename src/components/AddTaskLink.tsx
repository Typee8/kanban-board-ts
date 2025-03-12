import { useState, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { InputStyled } from "./styled/InputStyled";
import AddBtnStyled from "./styled/AddBtnStyled";

type AddTaskLinkProps = {
  addLink: () => void;
  register: UseFormRegisterReturn;
};

export default function AddTaskLink({ addLink, register }: AddTaskLinkProps) {
  const [editState, setEditState] = useState(false);

  const inputRef = useRef();

  const { ref: registerRef, ...restOfRegister } = register;

  const combineRefs = (node) => {
    inputRef.current = node;
    registerRef(node);
  };

  return (
    <li>
      <AddBtnStyled
        $isShown={!editState}
        onClick={() => {
          setTimeout(() => inputRef.current.focus(), 0);
          setEditState(true);
        }}
      />

      <InputStyled
        $isShown={editState}
        ref={combineRefs}
        register={restOfRegister}
        onBlur={(evt) => {
          evt.preventDefault();
          addLink();
          setEditState(false);
        }}
      />
    </li>
  );
}
