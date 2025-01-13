import Form from "./forms/Form";
import Input from "./inputs/Input";
import { useForm } from "react-hook-form";
import { updateStage, removeStage } from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";
import RemoveBtn from "./buttons/RemoveBtn";

export default function StageSettings({
  data,
  stageSettingsShown,
  setStageSettingsShown,
}: {
  stageSettingsShown: boolean;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: data.title,
    },
  });
  const dispatch = useDispatch();

  if (stageSettingsShown) {
    const onSubmit = (inputData, evt) => {
      evt.preventDefault();
      const newStage = { ...data, ...inputData };
      dispatch(updateStage(newStage));
      setStageSettingsShown(false);
    };

    const onRemoveBtnClick = (evt) => {
      evt.preventDefault();
      dispatch(removeStage({ stageId: data.id }));
      setStageSettingsShown(false);
    };

    return (
      <Form
        title="something"
        closeForm={setStageSettingsShown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <RemoveBtn onClick={onRemoveBtnClick} />
        <Input title="title" register={register("title")} />
      </Form>
    );
  }
}
