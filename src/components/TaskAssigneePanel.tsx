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

const TaskAssigneeContainer = styled.div`
  display: flex;
  overflow: scroll;
  gap: 10px;
  padding: 10px;
  margin-block: 10px 20px;
  border-radius: 10px;
  background-color: #fefefe;
`;

const LabelStyled = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;

  > * {
    width: 40px;
  }
`;

const TaskAssignee = styled.div`
  display: flex;
  align-items: center;
`;

const TaskAssigneeBtn = styled(ButtonStyled)`
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
      <LabelStyled htmlFor="taskAssignees">{groupIcon} Assignees: </LabelStyled>
      {fields.length > 0 ? (
        <TaskAssigneeContainer id="taskAssignees">
          {fields.map((field, index) => (
            <TaskAssignee key={field.id}>
              {field.name}
              <TaskAssigneeBtn onClick={() => remove(index)}>
                {crossIcon}
              </TaskAssigneeBtn>
            </TaskAssignee>
          ))}
        </TaskAssigneeContainer>
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
