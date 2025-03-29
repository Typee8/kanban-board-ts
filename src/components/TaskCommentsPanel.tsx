import { useFieldArray, useForm } from "react-hook-form";
import TextArea from "./inputs/TextArea";
import styled from "styled-components";
import ButtonStyled from "./styled/ButtonStyled";
import moment from "moment";
import { commentIcon, sendIcon } from "../assets/svg_icons";
import { useState, useRef, useEffect } from "react";
import TaskComment from "./TaskComment";
import DetailsLabelStyled from "./styled/DetailsLabelStyled";
import { tablet } from "../devicesWidthStandard";
import { motion } from "motion/react";

const TaskCommentsPanelStyled = styled.div`
  display: flex;
  width: 100%;

  color: var(--contrast-primary-color);
`;
TaskCommentsPanelStyled.displayName = "TaskCommentsPanelStyled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 20px;
  margin-bottom: 120px;
  border-radius: 10px;
`;
Container.displayName = "Container";

const CommentFieldWrapper = styled.div`
  touch-action: none;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: var(--transparent-primary-color);
`;
CommentFieldWrapper.displayName = "CommentFieldWrapper";

const CommentField = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 20px 20px 40px;
  border: 1px solid var(--secondary-color);
  border-radius: 0px 0px 30px 30px;
  background-color: var(--tertiary-color);

  @media (min-width: ${`${tablet}px`}) {
    max-width: calc(600px + 5vw);
  }
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
  color: var(--contrast-primary-color);
  background-color: var(--secondary-color);
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

  background-color: var(--secondary-color);
`;
CommentTextAreaPlaceholder.displayName = "CommentTextAreaPlaceholder";

const CommentSendBtn = styled(ButtonStyled)`
  width: 50px;
`;
CommentSendBtn.displayName = "CommentSendBtn";

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
        <DetailsLabelStyled htmlFor="taskComments">
          {commentIcon} Comments:
        </DetailsLabelStyled>
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
        <motion.div
          key={"stage-details"}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.2 }}
        >
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
        </motion.div>
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
