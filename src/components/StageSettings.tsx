import Form from "./forms/Form";
import Input from "./inputs/Input";
import { useForm } from "react-hook-form";
import { updateStage } from "../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";

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

    return (
      <Form
        title="something"
        closeForm={setStageSettingsShown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input title="title" register={register("title")} />
      </Form>
    );
  }
}
