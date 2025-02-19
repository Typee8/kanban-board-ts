import TextAreaStyled from "./styled/TextAreaStyled";
import { useState, useRef } from "react";
import styled from "styled-components";

const TaskDescriptionStyled = styled.div`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #9c9c9c;
    transform: scale(1.05);
  }
`;

export default function TaskDescriptionPanel({ getDescription, taskRegister }) {
  const [editState, setEditState] = useState(false);
  const textAreaRef = useRef();

  const { ref, ...restOfRegister } = taskRegister;

  const combineRefs = (node) => {
    textAreaRef.current = node;
    ref(node);
  };

  return (
    <div>
      <TaskDescriptionStyled
        onClick={() => {
          setEditState(true);
          setTimeout(() => textAreaRef.current.focus(), 0);
        }}
        $isShown={!editState}
      >
        {getDescription() ? getDescription() : "Description"}
      </TaskDescriptionStyled>
      <TextAreaStyled
        $isShown={editState}
        ref={combineRefs}
        register={restOfRegister}
        onBlur={() => setEditState(false)}
      />
    </div>
  );
}
