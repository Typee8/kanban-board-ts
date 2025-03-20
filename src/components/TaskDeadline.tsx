import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import InputStyled from "./styled/InputStyled";
import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { calendarEventIcon } from "../assets/svg_icons";
import ToolbarBtn from "./styled/ToolbarBtn";
import { crossIcon } from "../assets/svg_icons";
import { tablet } from "../devicesWidthStandard";

const TaskDeadlineStyled = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
TaskDeadlineStyled.displayName = "TaskDeadlineStyled";

const CalendarWrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) =>
    props.$isShown || props.$isShown === undefined ? "flex" : "none"};
  justify-content: center;
  align-items: flex-end;
  height: ${(props) => (props.$vh ? `${props.$vh * 100}px` : "100vh")};
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;
CalendarWrapper.displayName = "CalendarWrapper";

const CalendarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 60vh;
  padding: 80px 20px 40px 20px;
  border-radius: 40px 0px 0px 0px;
  background-color: #f3f3f3;
`;
CalendarContainer.displayName = "CalendarContainer";

const CalendarStyled = styled(DayPicker)`
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 20px;

  --rdp-accent-color: #d4182e;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;

  > * {
    width: 40px;
  }
`;
Label.displayName = "Label";

const CalendarToolbar = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  padding: 0 10px;
  border-radius: 0 0 0 20px;
  background-color: #fefefe;
`;
CalendarToolbar.displayName = "CalendarToolbar";

InputStyled.displayName = "Deadline";

export default function TaskDeadline({ getDate, setDate, register }) {
  const [calendarShown, setCalendarShown] = useState(false);
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    window.addEventListener("resize", () => setVh(window.innerHeight * 0.01));

    return window.removeEventListener("resize", () =>
      setVh(window.innerHeight * 0.01)
    );
  }, []);

  return (
    <TaskDeadlineStyled>
      <Label htmlFor="taskDeadline">{calendarEventIcon} Deadline:</Label>
      {calendarShown ? (
        <CalendarWrapper $vh={vh}>
          <CalendarContainer>
            <CalendarToolbar>
              <ToolbarBtn onClick={() => setCalendarShown(false)}>
                {crossIcon}
              </ToolbarBtn>
            </CalendarToolbar>
            <CalendarStyled
              mode="single"
              required={true}
              selected={getDate()}
              onSelect={(date) => {
                setDate(moment(date).format("L"));
                setCalendarShown(false);
              }}
            />
          </CalendarContainer>
        </CalendarWrapper>
      ) : null}

      <InputStyled
        autocomplete="off"
        id="taskDeadline"
        register={register}
        placeholder="pick deadline..."
        onFocus={(evt) => {
          console.log(tablet);
          console.log(window.innerWidth);
          if (window.innerWidth < tablet) evt.target.blur();
          setCalendarShown(true);
        }}
      />
    </TaskDeadlineStyled>
  );
}
