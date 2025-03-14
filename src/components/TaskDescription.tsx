import { editNoteIcon } from "../assets/svg_icons";
import TextArea from "./inputs/TextArea";
import styled from "styled-components";

const TaskDescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

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
  text-align: center;

  &:hover {
    background-color: #fefefe;
    border-radius: 10px;
  }

  &:focus {
    overflow: scroll;
  }
`;

const LabelStyled = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
  font-weight: 600;

  > * {
    width: 40px;
  }
`;

export default function TaskDescription({ register }) {
  return (
    <TaskDescriptionStyled>
      <LabelStyled htmlFor="taskDescripton">
        {editNoteIcon} Description:{" "}
      </LabelStyled>
      <TextAreaStyled
        id="taskDescripton"
        register={register}
        placeholder="type..."
      />
    </TaskDescriptionStyled>
  );
}
