import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { InputStyled } from "./styled/InputStyled";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import moment from "moment";

const TaskDeadlineStyled = styled.div`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #9c9c9c;
    transform: scale(1.05);
  }
`;

const DayPickerStyled = styled(DayPicker)`
  position: absolute;
  left: 250px;
  display: ${(props) => (props.$isShown ? "flex" : "none")};
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;

export default function TaskDeadlinePanel({ getDate, setDate, taskRegister }) {
  const [editState, setEditState] = useState(false);
  const inputRef = useRef();
  const taskDeadlinePanelRef = useRef();
  const { ref, ...restOfRegister } = taskRegister;

  const combineRefs = (node) => {
    inputRef.current = node;
    ref(node);
  };

  function turnOffEditState() {
    document.addEventListener("click", (evt) => {
      if (
        taskDeadlinePanelRef.current &&
        !taskDeadlinePanelRef.current.contains(evt.target)
      ) {
        setEditState(false);
      }
    });
  }

  useEffect(turnOffEditState, [editState]);

  return (
    <div ref={taskDeadlinePanelRef}>
      <TaskDeadlineStyled
        $isShown={!editState}
        onClick={() => {
          setEditState(true);
          setTimeout(() => inputRef.current.focus(), 0);
        }}
      >
        {getDate() ? getDate() : "Date"}
      </TaskDeadlineStyled>
      <DayPickerStyled
        $isShown={editState}
        mode="single"
        required={true}
        onSelect={(date) => {
          setDate(moment(date).format("L"));
          setEditState(false);
        }}
      />
      <InputStyled
        $isShown={editState}
        ref={combineRefs}
        register={restOfRegister}
      />
    </div>
  );
}
