import TaskFormStyled from "./styled/TaskFormStyled";
import TextArea from "./inputs/TextArea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateTask,
  removeTask,
  addNewTask,
} from "../store/slices/boardStateSlice";
import TaskAssigneePanel from "./TaskAssigneePanel";
import TaskCommentsPanel from "./TaskCommentsPanel";
import TaskTitlePanel from "./TaskTitlePanel";
import TaskDescriptionPanel from "./TaskDescriptionPanel";
import TaskDeadlinePanel from "./TaskDeadlinePanel";
import TaskPriorityPanel from "./TaskPriorityPanel";
import TaskDetailsLeavePanel from "./TaskDetailsLeavePanel";
import TaskDetailsToolbar from "./TaskDetailsToolbar";
import ButtonStyled from "./styled/ButtonStyled";
import styled from "styled-components";

type TaskDetailsProps = {
  stageId?: string;
  taskData?: any;
  taskDetailsShown: boolean;
  setTaskDetailsShown: Dispatch<SetStateAction<boolean>>;
};

const CloseBtnStyled = styled(ButtonStyled)`
  position: absolute;
  align-self: flex-end;
`;

CloseBtnStyled.displayName = "CloseBtnStyled";

export default function TaskDetails({
  stageId = "firstStage",
  taskData,
  taskDetailsShown,
  setTaskDetailsShown,
}: TaskDetailsProps) {
  const newTask = taskData ? false : true;

  const formDefaultValues = newTask
    ? {}
    : {
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

      if (newTask) {
        dispatch(addNewTask(inputData));
      } else {
        const newTask = { ...taskData, ...inputData };
        dispatch(updateTask({ task: newTask, taskId: taskData.id, stageId }));
        setTaskDetailsShown(false);
        setTaskDetailsLeavePanelShown(false);
      }
    };

    return (
      <TaskFormStyled onSubmit={handleSubmit(onSubmit)}>
        <TaskDetailsLeavePanel
          isShown={taskDetailsLeavePanelShown}
          setIsShown={setTaskDetailsLeavePanelShown}
          closeTaskDetails={() => setTaskDetailsShown(false)}
          resetTaskForm={() => reset(formDefaultValues)}
        />

        {newTask ? (
          <CloseBtnStyled
            onClick={() => {
              setTaskDetailsShown(false);
              reset();
            }}
          >
            X
          </CloseBtnStyled>
        ) : (
          <TaskDetailsToolbar
            isTaskFormDirty={isDirty}
            removeTask={() =>
              dispatch(removeTask({ taskId: taskData.id, stageId }))
            }
            showTaskDetailsLeavePanel={() =>
              setTaskDetailsLeavePanelShown(true)
            }
            hideTaskDetails={() => setTaskDetailsShown(false)}
          />
        )}

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

        {newTask ? null : <TaskCommentsPanel taskFormControl={control} />}

        <input type="submit" />
      </TaskFormStyled>
    );
  }
}
