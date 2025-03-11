import Form from "./forms/Form";
import ButtonStyled from "./styled/ButtonStyled";
import { useForm } from "react-hook-form";
import { updateStage, removeStage } from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import InputFluid from "./inputs/InputFluid";
import StageDetailsToolbar from "./StageDetailsToolbar";
import SelectFluid from "./inputs/SelectFluid";
import SaveChangesPanel from "./SaveChangesPanel";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StageDetailsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;

StageDetailsWrapper.displayName = "StageDetailsWrapper";

export default function StageDetails({
  stageData,
  stageDetailsShown,
  setStageDetailsShown,
}: {
  stageDetailsShown: boolean;
}) {
  const [saveChangesPanelShown, setSaveChangesPanelShown] = useState(false);
  const stageFromDefaultValues = {
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

  if (stageDetailsShown === false) return;

  const onSubmit = (inputData, evt) => {
    evt.preventDefault();

    const newStage = { ...stageData, ...inputData };
    dispatch(updateStage({ newStage, stageId: stageData.id }));
    setStageDetailsShown(false);
  };

  console.log(isDirty);

  return (
    <StageDetailsWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SaveChangesPanel
          isShown={saveChangesPanelShown}
          setIsShown={setSaveChangesPanelShown}
          closeEditingPanel={() => setStageDetailsShown(false)}
          discardChanges={() => reset()}
        />
        <StageDetailsToolbar>
          <ButtonStyled
            onClick={() => {
              dispatch(removeStage({ stageId: stageData.id }));
            }}
          >
            -
          </ButtonStyled>
          <ButtonStyled
            onClick={() => {
              if (isDirty) {
                setSaveChangesPanelShown(true);
              } else {
                setStageDetailsShown(false);
              }
            }}
          >
            x
          </ButtonStyled>
        </StageDetailsToolbar>
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
      </Form>
    </StageDetailsWrapper>
  );
}
