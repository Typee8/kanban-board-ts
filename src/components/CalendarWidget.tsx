import { DayPicker } from "react-day-picker";
import styled from "styled-components";
import "react-day-picker/style.css";
import CloseBtn from "./buttons/CloseBtn";
import { Dispatch, SetStateAction } from "react";

type CalendarWidgetProps = {
  calendarWidgetShown: boolean;
  setCalendarWidgetShown: [boolean, Dispatch<SetStateAction<boolean>>];
  mode: string;
  selected: string;
  onSelect: (name: string, value: string) => void;
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

const CloseBtnStyled = styled(CloseBtn)`
  align-self: flex-end;
`;

CloseBtnStyled.displayName = "CloseBtnStyled";

export default function CalendarWidget({
  calendarWidgetShown,
  setCalendarWidgetShown,
  mode,
  selected,
  onSelect,
}: CalendarWidgetProps) {
  return calendarWidgetShown ? (
    <CalendarWidgetStyled>
      <CloseBtnStyled onClick={() => setCalendarWidgetShown(false)} />
      <DayPicker mode={mode} selected={selected} onSelect={onSelect} />
    </CalendarWidgetStyled>
  ) : null;
}
