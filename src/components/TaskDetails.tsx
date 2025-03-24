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
import TaskDetailsToolbar from "./TaskDetailsToolbar";
import ButtonStyled from "./styled/ButtonStyled";
import TaskLinksPanel from "./TaskLinksPanel";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import isEqual from "lodash/isEqual";
import SaveChangesPanel from "./SaveChangesPanel";
import InputStyled from "./styled/InputStyled";
import TaskDescription from "./TaskDescription";
import DetailsSelect from "./inputs/DetailsSelect";
import { personIcon, priorityIcon } from "../assets/svg_icons";
import VerticalBreak from "./styled/VerticalBreak";
import { tablet, desktop } from "../devicesWidthStandard";

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

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: var(--transparent-primary-color);

  @media (min-width: ${`${tablet}px`}) {
    display: flex;
    justify-content: flex-end;
  }
`;
Wrapper.displayName = "Wrapper";

const TaskDetailsStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-inline: 20px;
  padding-block: 80px;
  border-radius: 40px 0px 0px 0px;
  background-color: var(--primary-color);
  overflow-y: scroll;

  @media (min-width: ${`${tablet}px`}) {
    max-width: calc(600px + 5vw);
    border: 5px solid var(--tertiary-color);
  }
`;

const Title = styled(InputStyled)`
  overflow: scroll;
  font-size: 24px;
`;
Title.displayName = "Title";

const SubmitStyled = styled(ButtonStyled)`
  position: fixed;
  align-self: center;
  bottom: 20px;
  padding: 20px 40px;
  margin-top: auto;
  font-size: 24px;
  background-color: var(--secondary-color);
`;
SubmitStyled.displayName = "SubmitStyled";

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
        priority: "low",
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
    <Wrapper>
      <TaskDetailsStyled onSubmit={handleSubmit(onSubmit)}>
        {taskDetailsLeavePanelShown ? (
          <SaveChangesPanel
            setIsShown={setTaskDetailsLeavePanelShown}
            closeEditingPanel={() => setTaskDetailsShown(false)}
            discardChanges={() => reset(formDefaultValues)}
          />
        ) : null}

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
        <Title register={register("title")} placeholder="Task title" />
        <VerticalBreak />
        <TaskDeadline
          getDate={() => getValues("deadline")}
          setDate={(newValue) =>
            setValue("deadline", newValue, { shouldDirty: true })
          }
          register={register("deadline")}
        />
        <VerticalBreak />
        <DetailsSelect
          register={register("priority")}
          options={["low", "medium", "high"]}
          title={<>{priorityIcon} Priority:</>}
        />
        <VerticalBreak />
        <DetailsSelect
          options={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
          register={register("assigneesLimit")}
          title={<>{personIcon} Assignees limit:</>}
        />
        <VerticalBreak />
        <TaskAssigneePanel taskFormControl={control} />
        <VerticalBreak />
        <TaskDescription register={register("description")} />
        <VerticalBreak />
        <TaskLinksPanel taskFormControl={control} />
        <VerticalBreak />
        {newTask ? null : <TaskCommentsPanel taskFormControl={control} />}
        {newTask ? <SubmitStyled type="submit">Add</SubmitStyled> : null}
      </TaskDetailsStyled>
    </Wrapper>
  );
}

const arePropsEqual = (prevProps, nextProps) =>
  isEqual(prevProps.obj, nextProps.obj);

export default React.memo(TaskDetails, arePropsEqual);
