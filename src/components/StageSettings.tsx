import Form from "./forms/Form";
import Input from "./inputs/Input";
import RemoveBtn from "./buttons/RemoveBtn";
import { useForm } from "react-hook-form";
import { updateStage, removeStage } from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";

export default function StageSettings({
  stageData,
  stageSettingsShown,
  setStageSettingsShown,
}: {
  stageSettingsShown: boolean;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: stageData.title,
    },
  });
  const dispatch = useDispatch();

  if (stageSettingsShown === false) return;

  return (
    <Form
      title="something"
      closeForm={setStageSettingsShown}
      onSubmit={handleSubmit((inputData, evt) => {
        evt.preventDefault();
        onSubmit(inputData, dispatch);
        setStageSettingsShown(false);
      })}
    >
      <RemoveBtn
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(removeStage({ stageId: stageData.id }));
          setStageSettingsShown(false);
        }}
      />
      <Input title="title" register={register("title")} />
    </Form>
  );
}

function onSubmit(inputData, dispatch) {
  const newStage = { ...stageData, ...inputData };
  dispatch(updateStage({ newStage, stageId: stageData.id }));
}
