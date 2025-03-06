import styled from "styled-components";
import { NavLink } from "react-router";

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
    </MenuStyled>
  );
}
