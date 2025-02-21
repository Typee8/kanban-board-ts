import InputStyled from "./styled/InputStyled";
import { useRef, useState } from "react";
import styled from "styled-components";
import InputFluid from "./inputs/InputFluid";

/* const TaskTitleStyled = styled.div`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #9c9c9c;
    transform: scale(1.05);
  }
`; */

// Tutaj skonczylem. W jaki sposob moge dodac style do zagniezdzonych elementow?
const InputFluidStyled = styled(InputFluid)``;

console.log(InputFluid.btn);

export default function TaskTitlePanel({ getTitle, taskRegister }) {
  /*   const [editState, setEditState] = useState(false);
  const inputRef = useRef();

  const { ref, ...restOfRegister } = taskRegister;

  const combineRefs = (node) => {
    inputRef.current = node;
    ref(node);
  };
 */
  return (
    <InputFluidStyled getSelectValue={getTitle} register={taskRegister} />
    /*     <div>
      <TaskTitleStyled
        $isShown={!editState}
        onClick={() => {
          if (!editState) {
            setEditState(true);
            setTimeout(() => inputRef.current.focus(), 0);
          }
        }}
      >
        {getTitle() ? getTitle() : "Task Title"}
      </TaskTitleStyled>
      <InputStyled
        $isShown={editState}
        ref={combineRefs}
        register={restOfRegister}
        onBlur={() => setEditState(false)}
      />
    </div> */
  );
}
