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
import TaskDeadline from "./TaskDeadline";
import TaskPriorityPanel from "./TaskPriorityPanel";
import TaskDetailsToolbar from "./TaskDetailsToolbar";
import ButtonStyled from "./styled/ButtonStyled";
import TaskLinksPanel from "./TaskLinksPanel";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import isEqual from "lodash/isEqual";
import SaveChangesPanel from "./SaveChangesPanel";
import { InputStyled } from "./styled/InputStyled";
import TaskDescription from "./TaskDescription";

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

const TaskDetailsWrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;

TaskDetailsWrapper.displayName = "TaskDetailsWrapper";

const TaskDetailsStyled = styled(Form)`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 80px;
  border-radius: 40px 0px 0px 0px;
  background-color: #f3f3f3;
  overflow-y: scroll;
`;

const TaskTitle = styled(InputStyled)`
  overflow: scroll;
  font-size: 24px;
`;

const SubmitStyled = styled.input`
  position: fixed;
  align-self: center;
  bottom: 20px;
  border: none;
  border-radius: 10px;
  background-color: #fefefe;
  padding: 20px 40px;
  margin-top: auto;
  transition: all 0.2s ease;
  font-size: 24px;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;

const VerticalBreak = styled.span`
  width: 100%;
  border-bottom: 2px solid #fefefe;
  margin-block: 20px;
`;

function TaskDetails({
  stageId = "firstStage",
  taskData,
  setTaskDetailsShown,
}: TaskDetailsProps) {
  const [taskDetailsLeavePanelShown, setTaskDetailsLeavePanelShown] =
    useState(false);

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
        status: "in progress",
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

  const onSubmit = (inputData, evt) => {
    evt.preventDefault();

    if (newTask) {
      inputData.id = uuidv4();
      dispatch(addNewTask(inputData));
      setTaskDetailsShown(false);
    } else {
      if (!isDirty) return;
      const newTask = { ...taskData, ...inputData };
      dispatch(updateTask({ task: newTask, taskId: taskData.id, stageId }));
      reset(newTask);
      setTaskDetailsLeavePanelShown(false);
    }
  };

  return (
    <TaskDetailsWrapper>
      <TaskDetailsStyled onSubmit={handleSubmit(onSubmit)}>
        <SaveChangesPanel
          isShown={taskDetailsLeavePanelShown}
          setIsShown={setTaskDetailsLeavePanelShown}
          closeEditingPanel={() => setTaskDetailsShown(false)}
          discardChanges={() => reset(formDefaultValues)}
        />

        <TaskDetailsToolbar
          newTask={newTask}
          isTaskFormDirty={isDirty}
          removeTask={() =>
            dispatch(removeTask({ taskId: taskData.id, stageId }))
          }
          showTaskDetailsLeavePanel={() => setTaskDetailsLeavePanelShown(true)}
          hideTaskDetails={() => setTaskDetailsShown(false)}
          taskStatusRegister={register("status")}
        />

        <TaskTitle register={register("title")} placeholder="Task title" />
        <VerticalBreak />
        <TaskDeadline
          getDate={() => getValues("deadline")}
          setDate={(newValue) =>
            setValue("deadline", newValue, { shouldDirty: true })
          }
          register={register("deadline")}
        />
        <VerticalBreak />
        <TaskPriorityPanel
          getPriority={() => getValues("priority")}
          taskRegister={register("priority")}
          optionsList={["low", "medium", "high"]}
        />
        <VerticalBreak />
        <TaskAssigneePanel
          taskRegister={register}
          taskFormControl={control}
          getTaskFormValues={getValues}
        />
        <VerticalBreak />
        <TaskDescription register={register("description")} />
        <VerticalBreak />
        <TaskLinksPanel
          taskRegister={register}
          taskFormControl={control}
          getTaskFormValues={getValues}
        />
        <VerticalBreak />

        {newTask ? null : <TaskCommentsPanel taskFormControl={control} />}
        {newTask ? <SubmitStyled type="submit" value="Add" /> : null}
      </TaskDetailsStyled>
    </TaskDetailsWrapper>
  );
}

const arePropsEqual = (prevProps, nextProps) =>
  isEqual(prevProps.obj, nextProps.obj);

export default React.memo(TaskDetails, arePropsEqual);
