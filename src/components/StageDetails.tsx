import Form from "./forms/Form";
import Input from "./inputs/Input";
import ButtonStyled from "./styled/ButtonStyled";
import { useForm } from "react-hook-form";
import { updateStage, removeStage } from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StageDetailsCloseBtnStyled = styled(ButtonStyled)`
  align-self: flex-end;
`;

export default function StageDetails({
  stageData,
  stageDetailsShown,
  setStageDetailsShown,
}: {
  stageDetailsShown: boolean;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: stageData.title,
    },
  });
  const dispatch = useDispatch();

  if (stageDetailsShown === false) return;

  return (
    <Form
      closeForm={() => {
        dispatch(removeStage({ stageId: stageData.id }));
        setStageDetailsShown(false);
      }}
      onSubmit={handleSubmit((inputData, evt) => {
        evt.preventDefault();
        onSubmit(inputData, dispatch);
        setStageDetailsShown(false);
      })}
    >
      <Input title="title" register={register("title")} />
    </Form>
  );
}

function onSubmit(inputData, dispatch) {
  const newStage = { ...stageData, ...inputData };
  dispatch(updateStage({ newStage, stageId: stageData.id }));
}
