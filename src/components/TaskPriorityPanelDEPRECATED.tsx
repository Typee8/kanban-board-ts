import { useState, useRef } from "react";
import { SelectStyled } from "./styled/SelectStyled";
import styled from "styled-components";

const TaskPriorityStyled = styled.div`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #9c9c9c;
    transform: scale(1.05);
  }
`;

export default function TaskPriorityPanel({
  getPriority,
  optionsList,
  taskRegister,
}) {
  const [editState, setEditState] = useState(false);
  const selectRef = useRef();

  const { ref, ...restOfRegister } = taskRegister;

  const combineRefs = (node) => {
    selectRef.current = node;
    ref(node);
  };

  return (
    <div>
      <TaskPriorityStyled
        $isShown={!editState}
        onClick={() => {
          if (!editState) {
            setEditState(true);
            setTimeout(() => selectRef.current.focus(), 0);
          }
        }}
      >
        {getPriority()}
      </TaskPriorityStyled>
      <SelectStyled
        $isShown={editState}
        ref={combineRefs}
        register={restOfRegister}
        options={optionsList}
        onBlur={() => setEditState(false)}
      />
    </div>
  );
}
