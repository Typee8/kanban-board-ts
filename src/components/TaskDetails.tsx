import TaskFormStyled from "./styled/TaskFormStyled";
import TextArea from "./inputs/TextArea";
import Input from "./inputs/Input";
import RemoveBtn from "./buttons/RemoveBtn";
import assignee from "../assets/assignee__placeholder__data";
import CloseBtn from "./buttons/CloseBtn";
import { Dispatch, SetStateAction, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../store/slices/boardStateSlice";
import styled from "styled-components";
import Select from "./inputs/Select";
import moment from "moment";
import CalendarWidget from "./CalendarWidget";
import AddBtn from "./buttons/AddBtn";

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

const TaskDetailsTitleStyled = styled(Input)`
  font-size: 18px;
`;

const TaskDetailsCalendarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SelectStyled = styled(Select)`
  position: absolute;
  ${({ $isShown }) => `
  pointer-events: ${$isShown ? "initial" : "none"};
  opacity: ${$isShown ? 1 : 0};
`}
`;

const TaskAssigneeSelect = styled.div`
  position: absolute;
  ${({ $isShown }) => `
  pointer-events: ${$isShown ? "initial" : "none"};
  opacity: ${$isShown ? 1 : 0};
`}
`;

const AddBtnStyled = styled(AddBtn)`
  position: absolute;
  ${({ $isShown }) => `
  pointer-events: ${$isShown ? "initial" : "none"};
  opacity: ${$isShown ? 1 : 0};
`}
`;

export default function TaskDetails({
  stageId,
  taskData,
  taskDetailsShown,
  setTaskDetailsShown,
}: TaskDetailsProps) {
  const [calendarWidgetShown, setCalendarWidgetShown] = useState(false);
  const [assigneeSelectShown, setAssigneeSelectShown] = useState(false);
  const [assigneeAddBtnShown, setAssigneeAddBtnShown] = useState(true);
  const selectRef = useRef();

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      title: taskData.title,
      description: taskData.description,
      attachments: taskData.attachments,
      deadline: taskData.deadline,
      priority: taskData.priority,
      assignee: "",
    },
  });
  const dispatch = useDispatch();

  if (taskDetailsShown) {
    const onSubmit = (inputData, evt) => {
      evt.preventDefault();
      const newTask = { ...taskData, ...inputData };
      console.log(newTask.id);
      dispatch(updateTask({ task: newTask, taskId: taskData.id, stageId }));
      setTaskDetailsShown(false);
    };

    const onRemoveBtnClick = (evt) => {
      evt.preventDefault();
      dispatch(removeTask({ taskId: taskData.id, stageId }));
      setTaskDetailsShown(false);
    };

    const assigneeList = taskData.assignee.map((assignee) => (
      <li key={assignee}>{assignee}</li>
    ));

    return (
      <TaskFormStyled onSubmit={handleSubmit(onSubmit)}>
        <TaskDetailsToolbarStyled>
          <RemoveBtn onClick={onRemoveBtnClick}>Delete Task</RemoveBtn>
          <CloseBtn />
        </TaskDetailsToolbarStyled>

        <TaskDetailsTitleStyled register={register("title")} />
        <TextArea title="description" register={register("description")} />
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
        <div className="task__assignee">
          <ul>
            assignee
            {assigneeList}
          </ul>
          <TaskAssigneeSelect
            ref={selectRef}
            $isShown={assigneeSelectShown}
            onBlur={(evt) => {
              evt.preventDefault();
              console.log("assignee lost focus");
              setAssigneeSelectShown(false);
              setAssigneeAddBtnShown(true);
            }}
          >
            <Select
              register={register("assignee")}
              /*               ref={selectRef} */
              optionsList={assignee.map((ele) => ele.name)}
            />
            {/*      <AddBtn onClick={save assignee to the state} /> */}
          </TaskAssigneeSelect>

          <AddBtnStyled
            $isShown={assigneeAddBtnShown}
            onClick={(evt) => {
              evt.preventDefault();
              console.log("assignee gained focus");
              setAssigneeSelectShown(true);
              setAssigneeAddBtnShown(false);
              console.log(selectRef.current);
              selectRef.current.focus();
            }}
          />
        </div>
      </TaskFormStyled>
    );
  }
}
