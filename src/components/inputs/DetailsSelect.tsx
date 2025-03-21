import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import DetailsLabelStyled from "../styled/DetailsLabelStyled";

const DetailsSelectStyled = styled.div`
  display: flex;
  padding-left: 20px;
  gap: 10px;
`;
DetailsSelectStyled.displayName = "DetailsSelectStyled";

const Select = styled.select`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  color: var(--contrast-primary-color);
  &:hover {
    background-color: var(--secondary-color);
  }
`;
Select.displayName = "Select";

export default function DetailsSelect({ register, options, title }) {
  const id = uuidv4();
  const optionsJSX = options.map((ele: string) => (
    <option key={ele} value={ele}>
      {ele}
    </option>
  ));

  return (
    <DetailsSelectStyled>
      <DetailsLabelStyled htmlFor={id}>{title}</DetailsLabelStyled>
      <Select id={id} {...register}>
        {optionsJSX}
      </Select>
    </DetailsSelectStyled>
  );
}
