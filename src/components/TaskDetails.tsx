import TaskFormStyled from "./styled/TaskFormStyled";
import TextArea from "./inputs/TextArea";
import Input from "./inputs/Input";
import RemoveBtn from "./buttons/RemoveBtn";
import ButtonStyled from "./styled/ButtonStyled";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../store/slices/boardStateSlice";
import styled from "styled-components";
import Select from "./inputs/Select";
import moment from "moment";
import CalendarWidget from "./CalendarWidget";
import TaskAssigneePanel from "./TaskAssigneePanel";
import TaskCommentsPanel from "./TaskCommentsPanel";
import TaskTitlePanel from "./TaskTitlePanel";
import TaskDescriptionPanel from "./TaskDescriptionPanel";

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

const TaskDetailsCalendarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function TaskDetails({
  stageId,
  taskData,
  taskDetailsShown,
  setTaskDetailsShown,
}: TaskDetailsProps) {
  const [calendarWidgetShown, setCalendarWidgetShown] = useState(false);

  const { register, handleSubmit, getValues, setValue, control } = useForm({
    defaultValues: {
      title: taskData.title,
      description: taskData.description,
      attachments: taskData.attachments,
      deadline: taskData.deadline,
      priority: taskData.priority,
      assigneesList: taskData.assigneesList,
      commentsList: taskData.commentsList,
    },
  });

  const dispatch = useDispatch();

  if (taskDetailsShown) {
    const onSubmit = (inputData, evt) => {
      evt.preventDefault();
      const newTask = { ...taskData, ...inputData };

      dispatch(updateTask({ task: newTask, taskId: taskData.id, stageId }));
      setTaskDetailsShown(false);
    };

    const onRemoveBtnClick = (evt) => {
      evt.preventDefault();
      dispatch(removeTask({ taskId: taskData.id, stageId }));
      setTaskDetailsShown(false);
    };

    return (
      <TaskFormStyled onSubmit={handleSubmit(onSubmit)}>
        <TaskDetailsToolbarStyled>
          <li>
            <RemoveBtn onClick={onRemoveBtnClick}>Delete Task</RemoveBtn>
          </li>
          <li>
            <ButtonStyled
              onClick={() => {
                setTaskDetailsShown(false);
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

        <TextArea title="attachments" register={register("attachments")} />
        <TaskDetailsCalendarContainer>
          <CalendarWidget
            calendarWidgetShown={calendarWidgetShown}
            setCalendarWidgetShown={setCalendarWidgetShown}
            mode="single"
            selected={getValues("deadline")}
            handleOnSelect={(value) =>
              setValue("deadline", moment(value).format("L"))
            }
          />
          <Input
            title="deadline"
            onFocus={() => setCalendarWidgetShown(true)}
            register={register("deadline")}
          />
        </TaskDetailsCalendarContainer>

        <Select
          title="priority"
          register={register("priority")}
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
