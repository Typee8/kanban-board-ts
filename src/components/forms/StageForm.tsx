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

  if (stageFormShown) {
    const onSubmit = (data, evt) => {
      evt.preventDefault();
      const newStage = data;
      newStage.id = uuidv4();
      newStage.tasksList = [];
      dispatch(addNewStage(newStage));
    };

    return (
      <Form
        title="something"
        closeForm={setStageFormShown}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input title="title" register={register("title")} />
      </Form>
    );
  }
}
