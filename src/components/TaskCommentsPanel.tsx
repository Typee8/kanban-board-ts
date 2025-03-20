import { useFieldArray, useForm } from "react-hook-form";
import TextArea from "./inputs/TextArea";
import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import moment from "moment";
import { commentIcon, sendIcon } from "../assets/svg_icons";
import { useState, useRef, useEffect } from "react";
import TaskComment from "./TaskComment";

const TaskCommentsPanelStyled = styled.div`
  display: flex;
  width: 100%;
`;
TaskCommentsPanelStyled.displayName = "TaskCommentsPanelStyled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 20px;
  margin-bottom: 100px;
  border-radius: 10px;
`;
Container.displayName = "Container";

const CommentFieldWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;
CommentFieldWrapper.displayName = "CommentFieldWrapper";

const CommentField = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 20px 20px 40px;
  gap: 20px;
  border: 1px solid #fefefe;
  border-radius: 0px 0px 30px 30px;
  background-color: #ebebeb;
`;
CommentField.displayName = "CommentField";

const CommentFieldPlaceholder = styled(CommentField)`
  top: unset;
  bottom: 0;
  padding: 20px;
  border-radius: 30px 30px 0px 0px;
`;
CommentFieldPlaceholder.displayName = "CommentFieldPlaceholder";

const CommentTextArea = styled(TextArea)`
  resize: none;
  border: none;
  background: none;
  width: 100%;
  min-height: 30px;
  max-height: 20vh;
  padding: 5px 10px;
  border-radius: 10px;
  transition: all 0.3s ease;
  overflow: scroll;

  background-color: #fefefe;
`;
CommentTextArea.displayName = "CommentTextArea";

const CommentTextAreaPlaceholder = styled.textarea`
  resize: none;
  border: none;
  background: none;
  width: 100%;
  min-height: 50px;
  max-height: 20vh;
  padding: 5px 10px;
  border-radius: 10px;
  transition: all 0.3s ease;
  overflow: scroll;

  background-color: #fefefe;
`;
CommentTextAreaPlaceholder.displayName = "CommentTextAreaPlaceholder";

const CommentSendBtn = styled(ButtonStyled)`
  width: 50px;
`;
CommentSendBtn.displayName = "CommentSendBtn";

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

export default function TaskCommentsPanel({
  taskFormControl,
}: {
  taskFormControl: object;
}) {
  const [commentFieldShown, setCommentFieldShown] = useState(false);
  const commentTextAreaRef = useRef();
  const { fields, prepend } = useFieldArray({
    name: "commentsList",
    control: taskFormControl,
  });

  const { register, getValues, resetField } = useForm();
  const { ref: commentRef, ...commentRegister } = register("comment");

  useEffect(() => {
    if (commentTextAreaRef.current) commentTextAreaRef.current.focus();
  }, [commentFieldShown]);

  return (
    <TaskCommentsPanelStyled>
      <Container>
        <Label htmlFor="taskComments">{commentIcon} Comments:</Label>
        {fields.length > 0 ? (
          <div id="taskComments">
            {fields.map((field) => (
              <TaskComment key={field.id} commentData={{ ...field }} />
            ))}
          </div>
        ) : null}
      </Container>
      {commentFieldShown ? null : (
        <CommentFieldPlaceholder>
          <CommentTextAreaPlaceholder
            onClick={() => setCommentFieldShown(true)}
            readOnly
            placeholder="comment..."
          />
        </CommentFieldPlaceholder>
      )}
      {commentFieldShown ? (
        <>
          <CommentFieldWrapper onClick={() => setCommentFieldShown(false)} />
          <CommentField onChange={adjustHeight}>
            <CommentTextArea
              ref={(node) => {
                commentTextAreaRef.current = node;
                commentRef(node);
              }}
              register={commentRegister}
              placeholder="comment..."
            />

            <CommentSendBtn
              onClick={() => {
                prepend({
                  comment: getValues("comment"),
                  user: "DefaultUser",
                  hour: moment().format("HH:mm"),
                  date: moment().format("L"),
                });
                resetField("comment");
                setCommentFieldShown(false);
              }}
            >
              {sendIcon}
            </CommentSendBtn>
          </CommentField>
        </>
      ) : null}
    </TaskCommentsPanelStyled>
  );
}

function adjustHeight(evt) {
  evt.target.style.height = "auto";
  const lineHeight =
    parseFloat(window.getComputedStyle(evt.target).fontSize) * 1.2;
  const scrollHeight = evt.target.scrollHeight;
  const linesCount = Math.floor(scrollHeight / lineHeight);
  evt.target.style.height = linesCount * lineHeight + "px";
}
