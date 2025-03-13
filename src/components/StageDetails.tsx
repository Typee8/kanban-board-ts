import Form from "./forms/Form";
import ButtonStyled from "./styled/ButtonStyled";
import { useForm } from "react-hook-form";
import {
  addNewStage,
  updateStage,
  removeStage,
} from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import SaveChangesPanel from "./SaveChangesPanel";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { InputStyled } from "./styled/InputStyled";
import { crossIcon, trashIcon } from "../assets/svg_icons";
import SelectTasksLimit from "./inputs/SelectTasksLimit";
import isEqual from "lodash/isEqual";
import React from "react";

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
  border-radius: 10px;

  &:hover {
    & * {
      color: #fefefe;
    }

    background-color: #1b1b1b;
  }
`;

ToolbarBtn.displayName = "ToolbarBtn";

const StageDetailsStyled = styled(Form)`
  position: relative;
  display: flex;
  width: 100vw;
  height: 60vh;
  padding: 20px;
  padding-top: 80px;
  border-radius: 40px 0px 0px 0px;
  background-color: #f3f3f3;
`;

const Title = styled(InputStyled)`
  overflow: scroll;
  font-size: 24px;
  margin-bottom: 30px;
`;

const ToolbarStyled = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  padding: 0 10px;
  border-radius: 0 0 0 20px;
  background-color: #fefefe;
`;

const SubmitStyled = styled.input`
  align-self: center;
  border: none;
  border-radius: 10px;
  background-color: #fefefe;
  padding: 20px 40px;
  margin-top: auto;
  transition: all 0.2s ease;
  font-size: 24px;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;

function StageDetails({ stageData, setStageDetailsShown }) {
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
        tasksLimit: "10",
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
        <ToolbarStyled>
          {newStage ? null : (
            <ToolbarBtn
              onClick={() => {
                dispatch(removeStage({ stageId: stageData.id }));
              }}
            >
              {trashIcon}
            </ToolbarBtn>
          )}
          {newStage ? (
            <ToolbarBtn
              onClick={() => {
                setStageDetailsShown(false);
              }}
            >
              {crossIcon}
            </ToolbarBtn>
          ) : (
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
          )}
        </ToolbarStyled>

        <Title register={register("title")} placeholder="Stage title" />

        <SelectTasksLimit
          register={register("tasksLimit")}
          options={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
        />
        {newStage ? (
          <SubmitStyled type="submit" value="Add" />
        ) : (
          <SubmitStyled type="submit" value="Commit" />
        )}
      </StageDetailsStyled>
    </StageDetailsWrapper>
  );
}

const arePropsEqual = (prevProps, nextProps) =>
  isEqual(prevProps.obj, nextProps.obj);

export default React.memo(StageDetails, arePropsEqual);
