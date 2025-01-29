import TaskFormStyled from "./styled/TaskFormStyled";
import TextArea from "./inputs/TextArea";
import Input from "./inputs/Input";
import RemoveBtn from "./buttons/RemoveBtn";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../store/slices/boardStateSlice";

export default function TaskSettings({
  stageId,
  taskData,
  taskSettingsShown,
  setTaskSettingsShown,
}: {
  taskSettingsShown: boolean;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: taskData.title,
      description: taskData.description,
      attachments: taskData.attachments,
      taskType: taskData.taskType,
      deadline: taskData.deadline,
      priority: taskData.priority,
      assignedPerson: taskData.assignedPerson,
    },
  });
  const dispatch = useDispatch();

  if (taskSettingsShown) {
    const onSubmit = (inputData, evt) => {
      evt.preventDefault();
      const newTask = { ...taskData, ...inputData };
      console.log(newTask.id);
      dispatch(updateTask({ task: newTask, taskId: taskData.id, stageId }));
      setTaskSettingsShown(false);
    };

    const onRemoveBtnClick = (evt) => {
      evt.preventDefault();
      dispatch(removeTask({ taskId: taskData.id, stageId }));
      setTaskSettingsShown(false);
    };

    return (
      <TaskFormStyled
        closeForm={setTaskSettingsShown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <RemoveBtn onClick={onRemoveBtnClick} />
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
