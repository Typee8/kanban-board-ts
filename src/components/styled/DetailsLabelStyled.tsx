import styled from "styled-components";

const DetailsLabelStyled = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: var(--contrast-primary-color);

  > * {
    width: 40px;
  }
`;
DetailsLabelStyled.displayName = "DetailsLabelStyled";

export default DetailsLabelStyled;
