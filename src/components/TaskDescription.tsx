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
  margin-bottom: 30px;
  padding: 10px 20px;
  min-width: 100%;
  min-height: 200px;
  max-height: 50%;
  transition: all 0.3s ease;
  font-family: "Roboto";
  font-size: 16px;

  &:hover {
    background-color: #fefefe;
    overflow: scroll;
    border-radius: 10px;
  }

  &::placeholder {
    font-size: 20px;
  }
`;

const LabelStyled = styled.label`
  padding-left: 20px;
  font-size: 18px;
`;

export default function TaskDescription({ register }) {
  return (
    <TaskDescriptionStyled>
      <LabelStyled htmlFor="taskDescripton">Description: </LabelStyled>
      <TextAreaStyled
        id="taskDescripton"
        register={register}
        placeholder="Task description"
      />
    </TaskDescriptionStyled>
  );
}
