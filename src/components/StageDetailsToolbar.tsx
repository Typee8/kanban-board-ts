import { ReactNode } from "react";
import styled from "styled-components";

const StageDetailsToolbarStyled = styled.ul`
  position: absolute;
  top: 0;
  right: 0px;
`;

type StageDetailsToolbarProps = {
  children: ReactNode;
};

export default function StageDetailsToolbar({
  children,
}: StageDetailsToolbarProps) {
  return <StageDetailsToolbarStyled>{children}</StageDetailsToolbarStyled>;
}
