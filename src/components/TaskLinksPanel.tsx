import { useForm, useFieldArray } from "react-hook-form";
import FormFieldArrayInput from "./FormFieldArrayInput";
import styled from "styled-components";
import { crossIcon, linkAddIcon, linkIcon } from "../assets/svg_icons";
import ButtonStyled from "./styled/ButtonStyled";
import DetailsLabelStyled from "./styled/DetailsLabelStyled";

type TaskAssigneePanelProps = {
  taskFormControl: object;
};

const TaskLinksPanelStyled = styled.div`
  padding-left: 20px;
  width: 100%;
`;
TaskLinksPanelStyled.displayName = "TaskLinksPanelStyled";

const TaskLink = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  transition: all 0.3s ease;

  * {
    color: var(--contrast-primary-color);
  }

  &:hover {
    background-color: var(--secondary-color);
  }
`;
TaskLink.displayName = "TaskLink";

const TaskLinkBtn = styled(ButtonStyled)`
  border-radius: 10px;
  justify-self: flex-end;
`;
TaskLinkBtn.displayName = "TaskLinkBtn";

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
InputStyled.displayName = "InputStyled";

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
      <DetailsLabelStyled htmlFor="taskLinks">
        {linkIcon} Links:{" "}
      </DetailsLabelStyled>
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
