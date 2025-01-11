import TaskFormStyled from "./styled/TaskFormStyled";
import TextArea from "./inputs/TextArea";
import Input from "./inputs/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/slices/boardStateSlice";

export default function TaskSettings({
  stageId,
  data,
  taskSettingsShown,
  setTaskSettingsShown,
}: {
  taskSettingsShown: boolean;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
      attachments: data.attachments,
      taskType: data.taskType,
      deadline: data.deadline,
      priority: data.priority,
      assignedPerson: data.assignedPerson,
    },
  });
  const dispatch = useDispatch();

  if (taskSettingsShown) {
    const onSubmit = (inputData, evt) => {
      evt.preventDefault();
      const newTask = { ...data, ...inputData };
      console.log(newTask.id);
      dispatch(updateTask({ newTask, stageId }));
    };

    return (
      <TaskFormStyled
        closeForm={setTaskSettingsShown}
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
