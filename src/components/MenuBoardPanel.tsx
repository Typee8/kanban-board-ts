import { NavLink } from "react-router";
import styled from "styled-components";

const MenuBoardPanelStyled = styled.ul`
  display: flex;
  gap: 20px;
`;

MenuBoardPanelStyled.displayName = "MenuBoardPanelStyled";

export default function MenuBoardPanel({
  boardSettingShown,
  setBoardSettingShown,
}) {
  return (
    <MenuBoardPanelStyled>
      <li>save</li>
      <li>invite</li>
      <li>
        <NavLink to="/">setup panel</NavLink>
      </li>
      <li
        onClick={() => {
          boardSettingShown
            ? setBoardSettingShown(false)
            : setBoardSettingShown(true);
        }}
      >
        board options
      </li>
    </MenuBoardPanelStyled>
  );
}
