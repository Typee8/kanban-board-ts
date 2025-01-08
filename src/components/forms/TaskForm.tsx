import styled from "styled-components";
import Form from "./Form";
import TextArea from "../inputs/Textarea";
import Input from "../inputs/Input";

const FormStyled = styled(Form)`
  z-index: 999;
  position: absolute;
  top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 800px;
  height: 800px;
  padding: 20px 60px;
  border-radius: 60px;
  background-color: blanchedalmond;
`;

export default function TaskForm({ taskFormShown, setTaskFormShown }) {
  if (taskFormShown) {
    return (
      <FormStyled closeForm={setTaskFormShown}>
        <TextArea title="description" />
        <TextArea title="attachments" />
        <Input title="taskType" />
        <Input title="deadline" />
        <Input title="priority" />
        <Input title="assignedPerson" />
      </FormStyled>
    );
  }
}
