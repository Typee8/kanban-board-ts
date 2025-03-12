import Form from "./forms/Form";
import ButtonStyled from "./styled/ButtonStyled";
import { useForm } from "react-hook-form";
import {
  addNewStage,
  updateStage,
  removeStage,
} from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import InputFluid from "./inputs/InputFluid";
import StageDetailsToolbar from "./StageDetailsToolbar";
import SelectFluid from "./inputs/SelectFluid";
import SaveChangesPanel from "./SaveChangesPanel";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "./icons/CloseIcon";

const StageDetailsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding-block: 120px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;

StageDetailsWrapper.displayName = "StageDetailsWrapper";

const CloseBtnStyled = styled(ButtonStyled)`
  position: absolute;
  align-self: flex-end;
`;

CloseBtnStyled.displayName = "CloseBtnStyled";

const StageDetailsStyled = styled(Form)`
  width: 80vw;
  height: 60vh;
  padding: 20px;
  border-radius: 20px;
  background-color: #f3f3f3;
`;

export default function StageDetails({ stageData, setStageDetailsShown }) {
  const [saveChangesPanelShown, setSaveChangesPanelShown] = useState(false);

  const newStage = stageData ? false : true;
  const stageFromDefaultValues = newStage
    ? {
        title: "",
        tasksLimit: "",
      }
    : {
        title: stageData.title,
        tasksLimit: stageData.tasksLimit,
      };

  const {
    formState: { isDirty },
    register,
    reset,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: stageFromDefaultValues,
  });
  const dispatch = useDispatch();

  useEffect(() => reset(stageFromDefaultValues), [stageData]);

  const onSubmit = (inputData, evt) => {
    evt.preventDefault();

    if (newStage) {
      inputData.id = uuidv4();
      dispatch(addNewStage(inputData));
    } else {
      const newStage = { ...stageData, ...inputData };
      dispatch(updateStage({ newStage, stageId: stageData.id }));
    }

    setStageDetailsShown(false);
  };

  return (
    <StageDetailsWrapper>
      <StageDetailsStyled onSubmit={handleSubmit(onSubmit)}>
        <SaveChangesPanel
          isShown={saveChangesPanelShown}
          setIsShown={setSaveChangesPanelShown}
          closeEditingPanel={() => setStageDetailsShown(false)}
          discardChanges={() => reset()}
        />
        {newStage ? (
          <CloseIcon
            onClick={() => {
              setStageDetailsShown(false);
              reset();
            }}
          />
        ) : (
          <StageDetailsToolbar>
            <ButtonStyled
              onClick={() => {
                dispatch(removeStage({ stageId: stageData.id }));
              }}
            >
              -
            </ButtonStyled>
            <CloseIcon
              onClick={() => {
                if (isDirty) {
                  setSaveChangesPanelShown(true);
                } else {
                  setStageDetailsShown(false);
                }
              }}
            />
          </StageDetailsToolbar>
        )}

        <InputFluid
          getInputValue={() => getValues("title")}
          register={register("title")}
        />
        <SelectFluid
          getSelectValue={() => getValues("tasksLimit")}
          selectOptions={Array.from({ length: 10 }, (_, i) =>
            (i + 1).toString()
          )}
          register={register("tasksLimit")}
        />
      </StageDetailsStyled>
    </StageDetailsWrapper>
  );
}
