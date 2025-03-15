import { useForm, useFieldArray } from "react-hook-form";
import FormFieldArrayInput from "./FormFieldArrayInput";
import styled from "styled-components";
import { crossIcon, linkAddIcon, linkIcon } from "../assets/svg_icons";
import ButtonStyled from "./styled/ButtonStyled";

type TaskAssigneePanelProps = {
  taskFormControl: object;
};

const TaskLinksPanelStyled = styled.div`
  padding-left: 20px;
  width: 100%;
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

const TaskLink = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fefefe;
  }
`;

const TaskLinkBtn = styled(ButtonStyled)`
  border-radius: 10px;
  justify-self: flex-end;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;

const InputStyled = styled.input`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  width: 100%;
  overflow: scroll;

  cursor: pointer;
`;

export default function TaskLinksPanel({
  taskFormControl,
}: TaskAssigneePanelProps) {
  const { fields, append, remove } = useFieldArray({
    control: taskFormControl,
    name: "links",
  });

  const { register, getValues, watch, resetField } = useForm();

  return (
    <TaskLinksPanelStyled>
      <LabelStyled htmlFor="taskLinks">{linkIcon} Links: </LabelStyled>
      {fields.length > 0 ? (
        <div id="taskLinks">
          {fields.map((field, index) => (
            <TaskLink key={field.id}>
              <InputStyled
                value={`\u2022  ${field.name}`}
                onClick={() => copyToClipboard(field.name)}
                readOnly
              />
              <TaskLinkBtn onClick={() => remove(index)}>
                {crossIcon}
              </TaskLinkBtn>
            </TaskLink>
          ))}
        </div>
      ) : null}
      <FormFieldArrayInput
        append={() => append({ name: getValues("newLink") })}
        resetInput={() => resetField("newLink")}
        checkInputLength={() => {
          const result = watch("newLink");
          const length = result ? result.length : 0;
          return length;
        }}
        register={register("newLink")}
        title={<>{linkAddIcon}</>}
        placeholder="insert link..."
      />
    </TaskLinksPanelStyled>
  );
}

function copyToClipboard(value) {
  window.navigator.clipboard
    .writeText(value)
    .then(() => {
      alert("Copied: " + value);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
