import Form from "./Form";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { addNewStage } from "../../store/slices/boardStateSlice";
import { useDispatch } from "react-redux";

export default function StageForm({
  stageFormShown,
  setStageFormShown,
}: {
  stageFormShown: boolean;
}) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  if (stageFormShown === false) return;

  return (
    <Form
      title="something"
      closeForm={setStageFormShown}
      onSubmit={handleSubmit((data, evt) => {
        onSubmit(data, evt, dispatch);
        setStageFormShown(false);
      })}
    >
      <Input title="title" register={register("title")} />
    </Form>
  );
}

function onSubmit(data, evt, dispatch) {
  evt.preventDefault();
  const newStage = data;
  newStage.id = uuidv4();
  newStage.tasksList = [];
  dispatch(addNewStage(newStage));
}
