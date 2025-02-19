import styled from "styled-components";
import { useForm } from "react-hook-form";
import ButtonStyled from "./styled/ButtonStyled";
import InputStyled from "./styled/InputStyled";
import { useState, useRef, useEffect } from "react";

const TaskCommentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border-radius: 20px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #9c9c9c;
    transform: scale(1.05);
  }
`;

const TaskCommentEditablesStyled = styled.div`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;
const TaskCommentValueStyled = styled(TaskCommentEditablesStyled)``;

type TaskCommentProps = {
  commentData: {
    user: string;
    date: string;
    hour: string;
    comment: string;
  };
};

export default function TaskComment({
  commentData,
  commentUpdate,
}: TaskCommentProps) {
  const { user, date, hour, comment } = commentData;
  const [editState, setEditState] = useState(false);
  const inputRef = useRef();
  const taskCommentRef = useRef();
  const { register, getValues, reset } = useForm({
    defaultValues: {
      comment,
    },
  });
  const { ref, ...restOfRegister } = register("comment");

  function turnOffEditState() {
    document.addEventListener("click", (evt) => {
      if (
        taskCommentRef.current &&
        !taskCommentRef.current.contains(evt.target)
      ) {
        reset();
        setEditState(false);
      }
    });
  }

  useEffect(turnOffEditState, [editState]);

  const combineRefs = (node) => {
    inputRef.current = node;
    ref(node);
  };

  return (
    <TaskCommentStyled
      ref={taskCommentRef}
      onClick={() => {
        if (!editState) {
          setEditState(true);
          setTimeout(() => inputRef.current.focus(), 0);
        }
      }}
    >
      <div>
        <span>{user}</span>
        <span>{`${date} at ${hour}`}</span>
      </div>
      <TaskCommentValueStyled $isShown={!editState}>
        {getValues("comment")}
      </TaskCommentValueStyled>
      <TaskCommentEditablesStyled $isShown={editState}>
        <InputStyled ref={combineRefs} register={restOfRegister} />
        <ButtonStyled onClick={() => commentUpdate(getValues().comment)}>
          {">"}
        </ButtonStyled>
      </TaskCommentEditablesStyled>
    </TaskCommentStyled>
  );
}
