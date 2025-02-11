import Select from "./components/inputs/Select";
import { useFieldArray } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import AddBtn from "./components/buttons/AddBtn";

const SelectStyled = styled(Select)`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;

const ButtonStyled = styled.button`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;

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

  return (
    <ul>
      {fields.map((field, index) => {
        const { name } = getTaskFormValues(`assigneesList.${index}`);
        console.log(name);
        const selectBtn = selectBtnShown.find((ele) => ele.id === field.id);
        const select = selectShown.find((ele) => ele.id === field.id);

        const isBtnShown = selectBtn.isShown;
        const isSelectShown = select.isShown;

        return (
          <li key={field.id}>
            <ButtonStyled
              $isShown={isBtnShown}
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
              }}
            >
              {name}
            </ButtonStyled>

            <SelectStyled
              $isShown={isSelectShown}
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

            {/*    <AddBtn onClick={} /> */}
          </li>
        );
      })}
    </ul>
  );
}
