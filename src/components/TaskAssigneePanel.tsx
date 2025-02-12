import assignee from "../assets/assignee__placeholder__data";
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import TaskAssignee from "./TaskAssignee";
import AddTaskAssignee from "./AddTaskAssignee";

type TaskAssigneePanelProps = {
  taskRegister: UseFormRegister<FieldValues>;
  taskFormControl: any;
  getTaskFormValues: any;
};

export default function TaskAssigneePanel({
  taskRegister,
  taskFormControl,
  getTaskFormValues,
}: TaskAssigneePanelProps) {
  const { fields, append, remove } = useFieldArray({
    control: taskFormControl,
    name: "assigneesList",
  });

  const { register, getValues } = useForm();

  return (
    <ul>
      {fields.map((field, index) => {
        return (
          <TaskAssignee
            key={field.id}
            removeAssignee={() => remove(index)}
            getName={() => getTaskFormValues(`assigneesList.${index}.name`)}
            availableAssignees={assignee.map((ele) => ele.name)}
            register={taskRegister(`assigneesList.${index}.name`)}
          />
        );
      })}
      <AddTaskAssignee
        addAssignee={() => append({ name: getValues("newAssignee") })}
        availableAssignees={assignee.map((ele) => ele.name)}
        register={register("newAssignee")}
      />
    </ul>
  );
}
