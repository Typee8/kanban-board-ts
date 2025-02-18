import { useFieldArray, useForm } from "react-hook-form";
import TaskComment from "./TaskComment";
import TextArea from "./inputs/TextArea";
import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import moment from "moment";

const TaskCommentsContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  border: 1px solid sandybrown;
  border-radius: 40px;
  min-width: 50%;
  min-height: 20%;
`;

export default function TaskCommentsPanel({
  taskFormControl,
}: {
  taskFormControl: object;
}) {
  const { fields, append, update } = useFieldArray({
    name: "commentsList",
    control: taskFormControl,
  });

  const { register, getValues, resetField } = useForm();

  return (
    <div>
      <TaskCommentsContainerStyled>
        <h2>Comments:</h2>
        {fields.map((field, index) => {
          return (
            <TaskComment
              key={field.id}
              commentData={field}
              commentUpdate={(editedComment) => {
                field.comment = editedComment;
                update(index, field);
              }}
            />
          );
        })}
      </TaskCommentsContainerStyled>

      <TextArea register={register("comment")} />
      <ButtonStyled
        onClick={() => {
          append({
            comment: getValues("comment"),
            user: "DefaultUser",
            hour: moment().format("HH:mm"),
            date: moment().format("L"),
          });
          resetField("comment");
        }}
      >
        Add
      </ButtonStyled>
    </div>
  );
}
