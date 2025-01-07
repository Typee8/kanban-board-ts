import Form from "./Form";

export default function StageForm({ stageFormShown, setStageFormShown }) {
  if (stageFormShown) {
    return <Form title="something" closeForm={setStageFormShown}></Form>;
  }
}
