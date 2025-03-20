import Form from "./forms/Form";
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
import { taskAltIcon } from "../assets/svg_icons";
import TaskDetailsSelect from "./inputs/TaskDetailsSelect";
import isEqual from "lodash/isEqual";
import React from "react";
import VerticalBreak from "./styled/VerticalBreak";
import StageDetailsToolbar from "./StageDetailsToolbar";

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: ${(props) => (props.$vh ? `${props.$vh * 100}px` : "100vh")};
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  );
`;
Wrapper.displayName = "Wrapper";

const StageDetailsStyled = styled(Form)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60vh;
  padding: 20px;
  padding-top: 80px;
  border-radius: 40px 0px 0px 0px;
  background-color: #f3f3f3;
`;
StageDetailsStyled.displayName = "StageDetailsStyled";

const TaskTitle = styled(InputStyled)`
  overflow: scroll;
  font-size: 24px;
`;
TaskTitle.displayName = "TaskTitle";

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
SubmitStyled.displayName = "SubmitStyled";

function StageDetails({ stageData, setStageDetailsShown }) {
  console.log("StageDetails renders");
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    window.addEventListener("resize", () => setVh(window.innerHeight * 0.01));

    return window.removeEventListener("resize", () =>
      setVh(window.innerHeight * 0.01)
    );
  }, []);

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
    <Wrapper $vh={vh}>
      <StageDetailsStyled onSubmit={handleSubmit(onSubmit)}>
        {saveChangesPanelShown ? (
          <SaveChangesPanel
            setIsShown={setSaveChangesPanelShown}
            closeEditingPanel={() => setStageDetailsShown(false)}
            discardChanges={() => reset()}
          />
        ) : null}

        <StageDetailsToolbar
          newStage={newStage}
          removeStage={() => {
            dispatch(removeStage({ stageId: stageData.id }));
          }}
          isFromDirty={isDirty}
          showSaveChangesPanel={() => setSaveChangesPanelShown(true)}
          hideStageDetails={() => setStageDetailsShown(false)}
        />

        <TaskTitle register={register("title")} placeholder="Stage title" />
        <VerticalBreak />
        <TaskDetailsSelect
          register={register("tasksLimit")}
          options={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
          title={<>{taskAltIcon} Limit:</>}
        />
        {newStage ? (
          <SubmitStyled type="submit" value="Add" />
        ) : (
          <SubmitStyled type="submit" value="Commit" />
        )}
      </StageDetailsStyled>
    </Wrapper>
  );
}

const arePropsEqual = (prevProps, nextProps) =>
  isEqual(prevProps.obj, nextProps.obj);

export default React.memo(StageDetails, arePropsEqual);
