import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { InputStyled } from "./styled/InputStyled";
import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { calendarEventIcon } from "../assets/svg_icons";
import ButtonStyled from "./styled/ButtonStyled";
import { crossIcon } from "../assets/svg_icons";
import { tablet } from "../devicesWidthStandard";

const TaskDeadlineStyle = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CalendarWrapperStyled = styled.div`
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

const CalendarContainerStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 60vh;
  padding: 80px 20px 40px 20px;
  border-radius: 40px 0px 0px 0px;
  background-color: #f3f3f3;
`;

const CalendarStyled = styled(DayPicker)`
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 20px;

  --rdp-accent-color: #d4182e;
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

const ToolbarStyled = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  padding: 0 10px;
  border-radius: 0 0 0 20px;
  background-color: #fefefe;
`;

const ToolbarBtn = styled(ButtonStyled)`
  width: 50px;
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;

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
    <TaskDeadlineStyle>
      <LabelStyled htmlFor="taskDeadline">
        {calendarEventIcon} Deadline:
      </LabelStyled>
      {calendarShown ? (
        <CalendarWrapperStyled $vh={vh}>
          <CalendarContainerStyled>
            <ToolbarStyled>
              <ToolbarBtn onClick={() => setCalendarShown(false)}>
                {crossIcon}
              </ToolbarBtn>
            </ToolbarStyled>
            <CalendarStyled
              mode="single"
              required={true}
              selected={getDate()}
              onSelect={(date) => {
                setDate(moment(date).format("L"));
                setCalendarShown(false);
              }}
            />
          </CalendarContainerStyled>
        </CalendarWrapperStyled>
      ) : null}

      <InputStyled
        autocomplete="off"
        id="taskDeadline"
        register={register}
        onFocus={(evt) => {
          console.log(tablet);
          console.log(window.innerWidth);
          if (window.innerWidth < tablet) evt.target.blur();
          setCalendarShown(true);
        }}
      />
    </TaskDeadlineStyle>
  );
}
