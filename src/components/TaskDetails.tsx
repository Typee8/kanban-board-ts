import Form from "./forms/Form";
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
import TaskLinksPanel from "./TaskLinksPanel";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import isEqual from "lodash/isEqual";

type TaskDetailsProps = {
  stageId?: string;
  taskData?: any;
  setTaskDetailsShown: Dispatch<SetStateAction<boolean>>;
};

const CloseBtnStyled = styled(ButtonStyled)`
  position: absolute;
  align-self: flex-end;
`;

CloseBtnStyled.displayName = "CloseBtnStyled";

function TaskDetails({
  stageId = "firstStage",
  taskData,
  setTaskDetailsShown,
}: TaskDetailsProps) {
  const newTask = taskData ? false : true;

  const formDefaultValues = newTask
    ? {
        title: "",
        description: "",
        links: "",
        deadline: "",
        priority: "",
        assigneesLimit: "",
        assigneesList: "",
        commentsList: "",
        status: "",
      }
    : {
        title: taskData.title,
        description: taskData.description,
        links: taskData.links,
        deadline: taskData.deadline,
        priority: taskData.priority,
        assigneesLimit: taskData.assigneesLimit ? taskData.assigneesLimit : "4",
        assigneesList: taskData.assigneesList,
        commentsList: taskData.commentsList,
        status: taskData.status,
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
    watch,
    reset,
  } = useForm({
    defaultValues: formDefaultValues,
  });
  const dispatch = useDispatch();

  useEffect(() => reset(formDefaultValues), [taskData]);

  const onSubmit = (inputData, evt) => {
    evt.preventDefault();

    if (newTask) {
      inputData.id = uuidv4();
      dispatch(addNewTask(inputData));
    } else {
      const newTask = { ...taskData, ...inputData };
      dispatch(updateTask({ task: newTask, taskId: taskData.id, stageId }));
      setTaskDetailsLeavePanelShown(false);
    }
    setTaskDetailsShown(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
          showTaskDetailsLeavePanel={() => setTaskDetailsLeavePanelShown(true)}
          hideTaskDetails={() => setTaskDetailsShown(false)}
          getTaskStatus={() => watch("status")}
          taskStatusRegister={register("status")}
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

      <TaskLinksPanel
        taskRegister={register}
        taskFormControl={control}
        getTaskFormValues={getValues}
      />

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
    </Form>
  );
}

const arePropsEqual = (prevProps, nextProps) =>
  isEqual(prevProps.obj, nextProps.obj);

export default React.memo(TaskDetails, arePropsEqual);
