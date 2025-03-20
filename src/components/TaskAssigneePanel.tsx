import { useForm, useFieldArray } from "react-hook-form";
import FormFieldArrayInput from "./FormFieldArrayInput";
import styled from "styled-components";
import { crossIcon, groupIcon, personAddIcon } from "../assets/svg_icons";
import ButtonStyled from "./styled/ButtonStyled";

type TaskAssigneePanelProps = {
  taskFormControl: object;
};

const TaskAssigneePanelStyled = styled.div`
  padding-left: 20px;
  width: 100%;
`;
TaskAssigneePanelStyled.displayName = "TaskAssigneePanelStyled";

const Container = styled.div`
  display: flex;
  overflow: scroll;
  gap: 10px;
  padding: 10px;
  margin-block: 10px 20px;
  border-radius: 10px;
  background-color: #fefefe;
`;
Container.displayName = "Container";

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;

  > * {
    width: 40px;
  }
`;
Label.displayName = "Label";

const Assignee = styled.div`
  display: flex;
  align-items: center;
`;
Assignee.displayName = "Assignee";

const AssigneRemoveBtn = styled(ButtonStyled)`
  width: 25px;
  border-radius: 5px;
  margin-left: 5px;
  padding: 5px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;
AssigneRemoveBtn.displayName = "AssigneRemoveBtn";

export default function TaskAssigneePanel({
  taskFormControl,
}: TaskAssigneePanelProps) {
  const { fields, append, remove } = useFieldArray({
    control: taskFormControl,
    name: "assigneesList",
  });

  const { register, getValues, watch, resetField } = useForm();

  return (
    <TaskAssigneePanelStyled>
      <Label htmlFor="taskAssignees">{groupIcon} Assignees: </Label>
      {fields.length > 0 ? (
        <Container id="taskAssignees">
          {fields.map((field, index) => (
            <Assignee key={field.id}>
              {field.name}
              <AssigneRemoveBtn onClick={() => remove(index)}>
                {crossIcon}
              </AssigneRemoveBtn>
            </Assignee>
          ))}
        </Container>
      ) : null}
      <FormFieldArrayInput
        append={() => append({ name: getValues("newAssignee") })}
        resetInput={() => resetField("newAssignee")}
        checkInputLength={() => {
          const result = watch("newAssignee");
          const length = result ? result.length : 0;
          return length;
        }}
        register={register("newAssignee")}
        title={<>{personAddIcon}</>}
        placeholder="new assignee..."
      />
    </TaskAssigneePanelStyled>
  );
}
