import TaskFormStyled from "./styled/TaskFormStyled";
import TextArea from "./inputs/TextArea";
import RemoveBtn from "./buttons/RemoveBtn";
import ButtonStyled from "./styled/ButtonStyled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../store/slices/boardStateSlice";
import styled from "styled-components";
import TaskAssigneePanel from "./TaskAssigneePanel";
import TaskCommentsPanel from "./TaskCommentsPanel";
import TaskTitlePanel from "./TaskTitlePanel";
import TaskDescriptionPanel from "./TaskDescriptionPanel";
import TaskDeadlinePanel from "./TaskDeadlinePanel";
import TaskPriorityPanel from "./TaskPriorityPanel";
import TaskDetailsLeavePanel from "./TaskDetailsLeavePanel";

type TaskDetailsProps = {
  stageId: string;
  taskDetailsShown: boolean;
  setTaskDetailsShown: [boolean, Dispatch<SetStateAction<boolean>>];
  taskData?: any;
};

const TaskDetailsToolbarStyled = styled.ul`
  position: absolute;
  right: 40px;
`;

export default function TaskDetails({
  stageId,
  taskData,
  taskDetailsShown,
  setTaskDetailsShown,
}: TaskDetailsProps) {
  const formDefaultValues = {
    title: taskData.title,
    description: taskData.description,
    attachments: taskData.attachments,
    deadline: taskData.deadline,
    priority: taskData.priority,
    assigneesList: taskData.assigneesList,
    commentsList: taskData.commentsList,
  };
  const [taskDetailsLeavePanelShown, setTaskDetailsLeavePanelShown] =
    useState(false);
  const {
    formState: { isDirty },
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
  } = useForm({
    defaultValues: formDefaultValues,
  });
  const dispatch = useDispatch();

  useEffect(() => reset(formDefaultValues), [taskData]);

  if (taskDetailsShown) {
    const onSubmit = (inputData, evt) => {
      evt.preventDefault();
      const newTask = { ...taskData, ...inputData };
      dispatch(updateTask({ task: newTask, taskId: taskData.id, stageId }));
      setTaskDetailsShown(false);
      setTaskDetailsLeavePanelShown(false);
    };

    const onRemoveBtnClick = (evt) => {
      evt.preventDefault();
      dispatch(removeTask({ taskId: taskData.id, stageId }));
    };

    return (
      <TaskFormStyled onSubmit={handleSubmit(onSubmit)}>
        <TaskDetailsLeavePanel
          isShown={taskDetailsLeavePanelShown}
          setIsShown={setTaskDetailsLeavePanelShown}
          closeTaskDetails={() => setTaskDetailsShown(false)}
          resetTaskForm={() => reset(formDefaultValues)}
        />
        <TaskDetailsToolbarStyled>
          <li>
            <RemoveBtn onClick={onRemoveBtnClick}>Delete Task</RemoveBtn>
          </li>
          <li>
            <ButtonStyled
              onClick={() => {
                if (isDirty) {
                  setTaskDetailsLeavePanelShown(true);
                } else {
                  setTaskDetailsShown(false);
                }
              }}
            >
              X
            </ButtonStyled>
          </li>
        </TaskDetailsToolbarStyled>

        <TaskTitlePanel
          getTitle={() => getValues("title")}
          taskRegister={register("title")}
        />
        <TaskDescriptionPanel
          getDescription={() => getValues("description")}
          taskRegister={register("description")}
        />

        {/*         <TextArea title="attachments" register={register("attachments")} /> */}

        <TaskDeadlinePanel
          getDate={() => getValues("deadline")}
          setDate={(newValue) => setValue("deadline", newValue)}
          taskRegister={register("deadline")}
        />

        <TaskPriorityPanel
          getPriority={() => getValues("priority")}
          taskRegister={register("priority")}
          optionsList={["low", "medium", "high"]}
        />

        <TaskAssigneePanel
          taskRegister={register}
          taskFormControl={control}
          getTaskFormValues={getValues}
        />

        <TaskCommentsPanel taskFormControl={control} />

        <input type="submit" />
      </TaskFormStyled>
    );
  }
}
