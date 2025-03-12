import Form from "./forms/Form";
import ButtonStyled from "./styled/ButtonStyled";
import { useForm } from "react-hook-form";
import {
  addNewStage,
  updateStage,
  removeStage,
} from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import StageDetailsToolbar from "./StageDetailsToolbar";
import SaveChangesPanel from "./SaveChangesPanel";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import InputFluid from "./inputs/InputFluid";
import SelectFluid from "./inputs/SelectFluid";
import { crossIcon, trashIcon } from "../assets/svg_icons";

const StageDetailsWrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  width: 100vw;
  height: ${(props) => (props.$vh ? `${props.$vh * 100}px` : "100vh")};
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;

StageDetailsWrapper.displayName = "StageDetailsWrapper";

const ToolbarBtn = styled(ButtonStyled)`
  width: 50px;
`;

ToolbarBtn.displayName = "ToolbarBtn";

const StageDetailsStyled = styled(Form)`
  position: relative;
  width: 100vw;
  height: 60vh;
  padding: 20px;
  border-radius: 40px 0px 0px 0px;
  background-color: #f3f3f3;
`;

export default function StageDetails({ stageData, setStageDetailsShown }) {
  console.log("StageDetails renders");
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(
    () =>
      window.addEventListener("resize", () => setVh(window.innerHeight * 0.01)),
    []
  );

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
    <StageDetailsWrapper $vh={vh}>
      <StageDetailsStyled onSubmit={handleSubmit(onSubmit)}>
        <SaveChangesPanel
          isShown={saveChangesPanelShown}
          setIsShown={setSaveChangesPanelShown}
          closeEditingPanel={() => setStageDetailsShown(false)}
          discardChanges={() => reset()}
        />
        <StageDetailsToolbar>
          {newStage ? null : (
            <ToolbarBtn
              onClick={() => {
                dispatch(removeStage({ stageId: stageData.id }));
              }}
            >
              {trashIcon}
            </ToolbarBtn>
          )}
          <ToolbarBtn
            onClick={() => {
              if (isDirty) {
                setSaveChangesPanelShown(true);
              } else {
                setStageDetailsShown(false);
              }
            }}
          >
            {crossIcon}
          </ToolbarBtn>
        </StageDetailsToolbar>

        <InputFluid register={register("title")} placeholder="Stage title" />
        {/*         <InputFluid
          getInputValue={() => getValues("title")}
          register={register("title")}
        /> */}
        {/*         <SelectFluid
          getSelectValue={() => getValues("tasksLimit")}
          selectOptions={Array.from({ length: 10 }, (_, i) =>
            (i + 1).toString()
          )}
          register={register("tasksLimit")}
        /> */}
        <SelectFluid
          register={register("tasksLimit")}
          optionsList={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
          title="Limit of tasks:"
        />
      </StageDetailsStyled>
    </StageDetailsWrapper>
  );
}
