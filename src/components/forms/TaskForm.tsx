import TaskFormStyled from "../styled/TaskFormStyled";
import TextArea from "../inputs/TextArea";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { addNewTask } from "../../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";

export default function TaskForm({
  taskFormShown,
  setTaskFormShown,
}: {
  taskFormShown: boolean;
}) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  if (taskFormShown) {
    const onSubmit = (data, evt) => {
      evt.preventDefault();
      const newTask = data;
      newTask.id = uuidv4();
      dispatch(addNewTask(newTask));
    };

    return (
      <TaskFormStyled
        closeForm={setTaskFormShown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input title="title" register={register("title")} />
        <TextArea title="description" register={register("description")} />
        <TextArea title="attachments" register={register("attachments")} />
        <Input title="taskType" register={register("taskType")} />
        <Input title="deadline" register={register("deadline")} />
        <Input title="priority" register={register("priority")} />
        <Input title="assignedPerson" register={register("assignedPerson")} />
      </TaskFormStyled>
    );
  }
}
