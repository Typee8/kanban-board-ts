import Form from "./Form";
import TextArea from "../inputs/Textarea";
import Input from "../inputs/Input";

export default function TaskForm({ taskFormShown, setTaskFormShown }) {
  if (taskFormShown) {
    return (
      <Form closeForm={setTaskFormShown}>
        <TextArea title="description" />
        <TextArea title="attachments" />
        <Input title="taskType" />
        <Input title="deadline" />
        <Input title="priority" />
        <Input title="assignedPerson" />
      </Form>
    );
  }
}
