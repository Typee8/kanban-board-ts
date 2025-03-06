import styled from "styled-components";
import { NavLink } from "react-router";

const MenuBoardPanelStyled = styled.ul`
  display: flex;
  gap: 20px;
`;

MenuBoardPanelStyled.displayName = "MenuBoardPanelStyled";

export default function MenuBoardPanel() {
  return (
    <MenuBoardPanelStyled>
      <li>
        <NavLink to="/">setup panel</NavLink>
      </li>
    </MenuBoardPanelStyled>
  );
}
