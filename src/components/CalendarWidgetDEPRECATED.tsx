import { DayPicker, DateRange, OnSelectHandler } from "react-day-picker";
import styled from "styled-components";
import "react-day-picker/style.css";
import ButtonStyled from "./styled/ButtonStyled";
import { Dispatch, SetStateAction } from "react";

type CalendarWidgetProps = {
  calendarWidgetShown: boolean;
  setCalendarWidgetShown: [boolean, Dispatch<SetStateAction<boolean>>];
  mode: "multiple" | "single" | "range";
  selected: DateRange;
  handleOnSelect: OnSelectHandler<DateRange>;
};

const CalendarWidgetStyled = styled.div`
  position: absolute;
  left: 250px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;

CalendarWidgetStyled.displayName = "CalendarWidgetStyled";

const CloseBtnStyled = styled(ButtonStyled)`
  align-self: flex-end;
`;

CloseBtnStyled.displayName = "CloseBtnStyled";

export default function CalendarWidget({
  calendarWidgetShown,
  setCalendarWidgetShown,
  mode,
  selected,
  handleOnSelect,
}: CalendarWidgetProps) {
  return calendarWidgetShown ? (
    <CalendarWidgetStyled>
      <CloseBtnStyled onClick={() => setCalendarWidgetShown(false)}>
        X
      </CloseBtnStyled>
      <DayPicker
        mode={mode}
        required={true}
        selected={selected}
        onSelect={handleOnSelect}
      />
    </CalendarWidgetStyled>
  ) : null;
}
