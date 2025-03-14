import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { InputStyled } from "./styled/InputStyled";
import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { calendarEventIcon } from "../assets/svg_icons";

const TaskDeadlineStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CalendarContainerStyled = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.$isShown ? "flex" : "none")};
  justify-content: center;
  width: 100vw;
  height: ${(props) => (props.$vh ? `${props.$vh * 100}px` : "100vh")};
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;

const CalendarStyled = styled(DayPicker)`
  position: absolute;
  top: 0px;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;

const LabelStyled = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;

  > * {
    width: 40px;
  }
`;

export default function TaskDeadline({ setDate, register }) {
  const [calendarShown, setCalendarShown] = useState(false);
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(
    () =>
      window.addEventListener("resize", () =>
        setVh(document.documentElement.clientHeight * 0.01)
      ),
    []
  );

  return (
    <TaskDeadlineStyle>
      <LabelStyled htmlFor="taskDeadline">
        {calendarEventIcon} Deadline:
      </LabelStyled>
      <CalendarContainerStyled $vh={vh} $isShown={calendarShown}>
        <CalendarStyled
          mode="single"
          required={true}
          onSelect={(date) => {
            setDate(moment(date).format("L"));
            setCalendarShown(false);
          }}
        />
      </CalendarContainerStyled>

      <InputStyled
        autocomplete="off"
        id="taskDeadline"
        register={register}
        onFocus={() => setCalendarShown(true)}
      />
    </TaskDeadlineStyle>
  );
}
