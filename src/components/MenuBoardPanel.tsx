import { NavLink } from "react-router";
import "../css/Menu.css";

export default function MenuBoardPanel({
  boardSettingShown,
  setBoardSettingShown,
}) {
  return (
    <ul className="menu">
      <li className="menu__item">save</li>
      <li className="menu__item">invite</li>
      <li className="menu__item">
        <NavLink to="/">setup panel</NavLink>
      </li>
      <li
        onClick={() => {
          boardSettingShown
            ? setBoardSettingShown(false)
            : setBoardSettingShown(true);
        }}
        className="menu__item"
      >
        board options
      </li>
    </ul>
  );
}
