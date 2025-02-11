/* import Select from "./components/inputs/Select"; */
import { useState } from "react";
/* import styled from "styled-components"; */
import SelectStyled from "./components/styled/SelectStyled";
import ButtonStyled from "./components/styled/ButtonStyled";

/* const SelectStyled = styled(Select)`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`;

const ButtonStyled = styled.button`
  display: ${(props) => (props.$isShown ? "initial" : "none")};
`; */

export default function TaskAssigneePanel({
  field,
  index,
  getTaskFormValues,
  availableAssigneeList,
  taskRegister,
}) {
  const [selectBtnShown, setSelectBtnShown] = useState(true);
  const [selectShown, setSelectShown] = useState(false);

  return (
    <li>
      <ButtonStyled
        type="button"
        $isShown={selectBtnShown}
        onClick={() => {
          setSelectBtnShown(false);
          setSelectShown(true);
        }}
      >
        {getTaskFormValues(`assigneesList.${index}.name`)}
      </ButtonStyled>

      <SelectStyled
        $isShown={selectShown}
        register={taskRegister(`assigneesList.${index}.name`)}
        optionsList={availableAssigneeList}
        onBlur={(evt) => {
          evt.preventDefault();
          setSelectBtnShown(true);
          setSelectShown(false);
        }}
      />
    </li>
  );
}
