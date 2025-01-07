import { NavLink } from "react-router";
import "../css/Menu.css";

export default function Menu() {
  return (
    <ul className="menu">
      <li className="menu__item">
        <NavLink to="/">setup panel</NavLink>
      </li>
      <li className="menu__item">
        <NavLink to="/account-manager">account</NavLink>
      </li>
      <li className="menu__item">
        <NavLink to="/team">team</NavLink>
      </li>
      <li className="menu__item">
        <NavLink to="/login-screen">log off</NavLink>
      </li>
    </ul>
  );
}
