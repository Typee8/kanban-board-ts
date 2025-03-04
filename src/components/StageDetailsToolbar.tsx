import { ReactNode } from "react";
import styled from "styled-components";

const StageDetailsToolbarStyled = styled.ul`
  position: absolute;
  right: 40px;
`;

type StageDetailsToolbarProps = {
  children: ReactNode;
};

export default function StageDetailsToolbar({
  children,
}: StageDetailsToolbarProps) {
  return <StageDetailsToolbarStyled>{children}</StageDetailsToolbarStyled>;
}
