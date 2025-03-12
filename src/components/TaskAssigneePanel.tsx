import assignee from "../assets/assignee__placeholder__data";
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
} from "react-hook-form";
import TaskAssignee from "./TaskAssignee";
import AddTaskAssignee from "./AddTaskAssignee";
import { SelectStyled } from "./styled/SelectStyled";

type TaskAssigneePanelProps = {
  taskRegister: UseFormRegister<FieldValues>;
  taskFormControl: object;
  getTaskFormValues: () => UseFormGetValues<FieldValues>;
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
      <li>
        <div>Assignee limit:</div>
        <SelectStyled
          getSelectValue={() => getTaskFormValues("assigneesLimit")}
          selectOptions={Array.from({ length: 10 }, (_, i) =>
            (i + 1).toString()
          )}
          register={taskRegister("assigneesLimit")}
        />
      </li>
      {fields.map((field, index) => (
        <TaskAssignee
          key={field.id}
          removeAssignee={() => remove(index)}
          getValue={() => getTaskFormValues(`assigneesList.${index}.name`)}
          availableAssignees={assignee.map((ele) => ele.name)}
          register={taskRegister(`assigneesList.${index}.name`)}
        />
      ))}
      <AddTaskAssignee
        addAssignee={() => append({ name: getValues("newAssignee") })}
        availableAssignees={assignee.map((ele) => ele.name)}
        register={register("newAssignee")}
      />
    </ul>
  );
}
