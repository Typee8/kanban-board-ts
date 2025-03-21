import { editNoteIcon } from "../assets/svg_icons";
import TextArea from "./inputs/TextArea";
import styled from "styled-components";
import DetailsLabelStyled from "./styled/DetailsLabelStyled";

const TaskDescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
TaskDescriptionStyled.displayName = "TaskDescriptionStyled";

const TextAreaStyled = styled(TextArea)`
  resize: none;
  background: none;
  border: none;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 10px;
  min-width: 100%;
  min-height: 200px;
  max-height: 50%;
  transition: all 0.3s ease;
  font-family: "Roboto";
  font-size: 16px;
  color: var(--contrast-primary-color);

  &:hover,
  &:focus {
    background-color: var(--secondary-color);
    border-radius: 10px;
  }

  &:focus {
    overflow: scroll;
  }
`;
TextAreaStyled.displayName = "TextAreaStyled";

const Label = styled(DetailsLabelStyled)`
  padding-left: 20px;
`;
Label.displayName = "Label";

export default function TaskDescription({ register }) {
  return (
    <TaskDescriptionStyled>
      <Label htmlFor="taskDescripton">{editNoteIcon} Description: </Label>
      <TextAreaStyled
        id="taskDescripton"
        register={register}
        placeholder="type..."
      />
    </TaskDescriptionStyled>
  );
}
