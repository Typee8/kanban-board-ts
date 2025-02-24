import TaskLink from "./TaskLink";
import AddTaskLink from "./AddTaskLink";
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
} from "react-hook-form";
import styled from "styled-components";

const TaskLinksPanelStyled = styled.ul`
  max-width: 80%;
`;

type TaskLinksPanelProps = {
  taskRegister: UseFormRegister<FieldValues>;
  taskFormControl: object;
  getTaskFormValues: () => UseFormGetValues<FieldValues>;
};

export default function TaskLinksPanel({
  taskRegister,
  taskFormControl,
  getTaskFormValues,
}: TaskLinksPanelProps) {
  const { fields, append, remove } = useFieldArray({
    control: taskFormControl,
    name: "links",
  });

  const { register, getValues } = useForm();

  return (
    <TaskLinksPanelStyled>
      {fields.map((field, index) => (
        <TaskLink
          key={field.id}
          removeLink={() => remove(index)}
          getValue={() => getTaskFormValues(`links.${index}`)}
          register={taskRegister(`links.${index}`)}
        />
      ))}
      <AddTaskLink
        addLink={() => append(getValues("newLink"))}
        register={register("newLink")}
      />
    </TaskLinksPanelStyled>
  );
}
