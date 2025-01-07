import "../css/TaskCard.css";
import { useState } from "react";
import SettingsBtn from "./buttons/SettingsBtn";
import TaskForm from "./forms/TaskForm";

export default function TaskCard({ data }) {
  const [taskFormShown, setTaskFormShown] = useState(false);
  const { title } = data;

  return (
    <li className="task-card">
      <SettingsBtn onClick={() => setTaskFormShown(true)} />
      <div className="task-card__container">
        <h2 className="task-card__title">{title}</h2>
      </div>
      <TaskForm
        taskFormShown={taskFormShown}
        setTaskFormShown={() => setTaskFormShown(false)}
      />
    </li>
  );
}
