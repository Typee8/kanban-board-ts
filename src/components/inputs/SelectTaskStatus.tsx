import styled from "styled-components";

const SelectStyled = styled.select`
  border: none;
  background: none;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  transition: all 0.3s ease;

  &:hover {
    color: #fefefe;
    background-color: #1b1b1b;
  }
`;

export default function SelectTaskStatus({ register }) {
  const options = ["in progress", "needs review", "done"];
  const optionsJSX = options.map((ele: string) => (
    <option key={ele} value={ele}>
      {ele}
    </option>
  ));

  return <SelectStyled {...register}>{optionsJSX}</SelectStyled>;
}
