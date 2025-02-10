import Select from "./components/inputs/Select";
import { useFieldArray } from "react-hook-form";
import { useState } from "react";

export default function TaskAssigneePanel({
  availableAssigneeList,
  taskRegister,
  getTaskFormValues,
  taskFormControl,
  setFocus,
}) {
  const { fields } = useFieldArray({
    control: taskFormControl,
    name: "assigneesList",
  });

  const [selectShown, setSelectShown] = useState(
    fields.map((field) => ({
      id: field.id,
      isShown: false,
    }))
  );
  const [selectBtnShown, setSelectBtnShown] = useState(
    fields.map((field) => ({
      id: field.id,
      isShown: true,
    }))
  );

  /*   const setFocus = (name, options = {}) => {
    const field = get(_fields, name);
    const fieldReference = field && field._f;
    if (fieldReference) {
      const fieldRef = fieldReference.refs
        ? fieldReference.refs[0]
        : fieldReference.ref;
      if (fieldRef.focus) {
        fieldRef.focus();
        options.shouldSelect &&
          isFunction(fieldRef.select) &&
          fieldRef.select();
      }
    }
  }; */

  return (
    <ul>
      {fields.map((field, index) => {
        const { name } = getTaskFormValues(`assigneesList.${index}`);

        const selectBtn = selectBtnShown.find((ele) => ele.id === field.id);
        console.log(selectBtn);
        const select = selectShown.find((ele) => ele.id === field.id);

        const isBtnShown = selectBtn.isShown;
        console.log(isBtnShown);
        const isSelectShown = select.isShown;

        console.log(selectBtn);

        return (
          <li key={field.id}>
            {isBtnShown ? (
              <button
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectBtnShown((prevState) => {
                    const index = prevState.indexOf(selectBtn);
                    const newState = JSON.parse(JSON.stringify(prevState));
                    newState[index].isShown = false;
                    return newState;
                  });

                  setSelectShown((prevState) => {
                    const index = prevState.indexOf(select);
                    const newState = JSON.parse(JSON.stringify(prevState));
                    newState[index].isShown = true;
                    return newState;
                  });

                  setFocus(`assigneesList`, true);
                }}
              >
                {name}
              </button>
            ) : null}

            {isSelectShown ? (
              <Select
                register={taskRegister(`assigneesList.${index}.name`)}
                optionsList={availableAssigneeList}
                onBlur={(evt) => {
                  evt.preventDefault();
                  setSelectBtnShown((prevState) => {
                    const index = prevState.indexOf(selectBtn);
                    const newState = JSON.parse(JSON.stringify(prevState));
                    newState[index].isShown = true;
                    return newState;
                  });

                  setSelectShown((prevState) => {
                    const index = prevState.indexOf(select);
                    const newState = JSON.parse(JSON.stringify(prevState));
                    newState[index].isShown = false;
                    return newState;
                  });
                }}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
