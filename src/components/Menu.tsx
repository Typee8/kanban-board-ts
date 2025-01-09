import { NavLink } from "react-router";
import styled from "styled-components";

const MenuStyled = styled.ul`
  display: flex;
  gap: 20px;
  background-color: blanchedalmond;
`;

MenuStyled.displayName = "MenuStyled";

export default function Menu() {
  return (
    <MenuStyled>
      <li>
        <NavLink to="/">setup panel</NavLink>
      </li>
      <li>
        <NavLink to="/account-manager">account</NavLink>
      </li>
      <li>
        <NavLink to="/team">team</NavLink>
      </li>
      <li>
        <NavLink to="/login-screen">log off</NavLink>
      </li>
    </MenuStyled>
  );
}
