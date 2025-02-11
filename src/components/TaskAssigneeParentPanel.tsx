import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import TaskAssigneePanel from "../TaskAssigneePanel";
import AddBtnStyled from "./styled/AddBtnStyled";
import SelectStyled from "./styled/SelectStyled";

export default function TaskAssigneeParentPanel({
  taskRegister,
  taskFormControl,
  getTaskFormValues,
  availableAssigneeList,
}) {
  const { fields, append } = useFieldArray({
    control: taskFormControl,
    name: "assigneesList",
  });

  const { register, getValues } = useForm();

  const [addBtnShown, setAddBtnShown] = useState(true);
  const [selectShown, setSelectShown] = useState(false);

  return (
    <ul>
      {fields.map((field, index) => {
        return (
          <TaskAssigneePanel
            key={field.id}
            field={field}
            index={index}
            getTaskFormValues={getTaskFormValues}
            availableAssigneeList={availableAssigneeList}
            taskRegister={taskRegister}
          />
        );
      })}
      <li>
        <AddBtnStyled
          $isShown={addBtnShown}
          onClick={() => {
            setAddBtnShown(false);
            setSelectShown(true);
          }}
        />
        <SelectStyled
          $isShown={selectShown}
          optionsList={availableAssigneeList}
          register={register("newAssignee")}
          onBlur={() => {
            append({ name: getValues("newAssignee") });
            setAddBtnShown(true);
            setSelectShown(false);
          }}
        />
      </li>
    </ul>
  );
}
