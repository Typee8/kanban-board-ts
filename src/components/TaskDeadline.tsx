import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import InputStyled from "./styled/InputStyled";
import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { calendarEventIcon } from "../assets/svg_icons";
import ToolbarBtn from "./styled/ToolbarBtn";
import { crossIcon } from "../assets/svg_icons";
import { tablet } from "../devicesWidthStandard.tsx";
import DetailsLabelStyled from "./styled/DetailsLabelStyled";
import { motion } from "motion/react";

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
  right: 0;
  display: ${(props) =>
    props.$isShown || props.$isShown === undefined ? "flex" : "none"};
  justify-content: center;
  align-items: flex-end;
  height: ${(props) => (props.$vh ? `${props.$vh * 100}px` : "100vh")};
  background: var(--transparent-primary-color);
`;
CalendarWrapper.displayName = "CalendarWrapper";

const CalendarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  min-height: 60vh;
  padding: 80px 20px 40px 20px;
  border-radius: 40px 0px 0px 0px;
  background-color: var(--primary-color);

  @media (min-width: ${`${tablet}px`}) {
    position: fixed;
    top: 0;
    right: 0;
    max-width: calc(600px + 5vw);
    height: 100%;
  }
`;
CalendarContainer.displayName = "CalendarContainer";

const CalendarStyled = styled(DayPicker)`
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  color: var(--contrast-primary-color);
  background-color: var(--secondary-color);

  --rdp-accent-color: var(--highlight-secondary-color);
`;

const CalendarToolbar = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  padding: 0 10px;
  border-radius: 0 0 0 20px;
  background-color: var(--secondary-color);
`;
CalendarToolbar.displayName = "CalendarToolbar";

InputStyled.displayName = "Deadline";

export default function TaskDeadline({ getDate, setDate, register }) {
  const [calendarShown, setCalendarShown] = useState(false);
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const today = new Date();

  useEffect(() => {
    window.addEventListener("resize", () => setVh(window.innerHeight * 0.01));

    return window.removeEventListener("resize", () =>
      setVh(window.innerHeight * 0.01)
    );
  }, []);

  return (
    <TaskDeadlineStyled>
      <DetailsLabelStyled htmlFor="taskDeadline">
        {calendarEventIcon} Deadline:
      </DetailsLabelStyled>
      {calendarShown ? (
        <motion.div
          key={"stage-details"}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.2 }}
        >
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
                disabled={{ before: today }}
                onSelect={(date) => {
                  setDate(moment(date).format("L"));
                  setCalendarShown(false);
                }}
              />
            </CalendarContainer>
          </CalendarWrapper>
        </motion.div>
      ) : null}

      <InputStyled
        autocomplete="off"
        id="taskDeadline"
        register={register}
        placeholder="pick deadline..."
        onFocus={(evt) => {
          if (window.innerWidth < tablet) evt.target.blur();
          setCalendarShown(true);
        }}
      />
    </TaskDeadlineStyled>
  );
}
