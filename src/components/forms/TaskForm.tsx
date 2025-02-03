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

  if (taskFormShown === false) return;

  return (
    <TaskFormStyled
      closeForm={setTaskFormShown}
      onSubmit={handleSubmit((data, evt) => {
        onSubmit(data, evt, dispatch);
        setTaskFormShown(false);
      })}
    >
      <Input title="title" register={register("title")} />
      <TextArea title="description" register={register("description")} />
      <TextArea title="attachments" register={register("attachments")} />
      <Input title="deadline" register={register("deadline")} />
      <Input title="priority" register={register("priority")} />
      <Input title="assignee" register={register("assignee")} />
    </TaskFormStyled>
  );
}

function onSubmit(data, evt, dispatch) {
  evt.preventDefault();
  const newTask = data;
  newTask.id = uuidv4();
  dispatch(addNewTask(newTask));
}
