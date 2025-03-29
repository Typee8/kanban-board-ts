import styled from "styled-components";
import Form from "./Form";
import { useState, useEffect } from "react";
import InputStyled from "../styled/InputStyled";
import ButtonStyled from "../styled/ButtonStyled";
import { crossIcon } from "../../assets/svg_icons";
import { useDispatch } from "react-redux";
import { setBoardId } from "../../store/slices/boardStateSlice";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { fetchData } from "../../server/FirebaseAPI";
import { tablet } from "../../devicesWidthStandard";
import { motion } from "motion/react";

const Wrapper = styled.section`
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: ${(props) => (props.$vh ? `${props.$vh * 100}px` : "100vh")};
  background: var(--transparent-primary-color);

  @media (min-width: ${`${tablet}px`}) {
    display: flex;
    justify-content: flex-end;
  }
`;
Wrapper.displayName = "Wrapper";

const OpenBoardFormStyled = styled(Form)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60vh;
  padding: 20px;
  padding-top: 80px;
  border-radius: 40px 0px 0px 0px;
  background-color: var(--primary-color);

  @media (min-width: ${`${tablet}px`}) {
    max-width: calc(600px + 5vw);
    height: 100%;
    border: 5px solid var(--tertiary-color);
  }
`;
OpenBoardFormStyled.displayName = "OpenBoardFormStyled";

const CloseBtn = styled(ButtonStyled)`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 10px 20px;
  border: 0px solid var(--primary-color);
  border-width: 2px 0px 2px 2px;
  border-radius: 0 0 0 20px;
  background-color: var(--secondary-color);

  > * {
    width: 30px;
  }
`;
CloseBtn.displayName = "CloseBtn";

const SubmitStyled = styled.input`
  align-self: center;
  border: none;
  border-radius: 10px;
  background-color: var(--secondary-color);
  padding: 20px 40px;
  margin-top: auto;
  transition: all 0.2s ease;
  font-size: 24px;

  color: var(--contrast-primary-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--contrast-primary-color);
  }
`;
SubmitStyled.displayName = "SubmitStyled";

const BoardIdInput = styled(InputStyled)`
  font-size: 24px;
`;
BoardIdInput.displayName = "BoardIdInput";

const ErrorInfo = styled.p`
  margin-top: 5px;
  margin-left: 20px;
  color: var(--highlight-primary-color);
`;
ErrorInfo.displayName = "ErrorInfo";

export default function OpenBoardForm({ closeForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    window.addEventListener("resize", () => setVh(window.innerHeight * 0.01));

    return window.removeEventListener("resize", () =>
      setVh(window.innerHeight * 0.01)
    );
  }, []);

  const onSubmit = async (input, evt) => {
    evt.preventDefault();
    const { boardId } = input;
    dispatch(setBoardId(boardId));
    sessionStorage.setItem("boardId", boardId);
    navigate("/board-panel");
  };

  return (
    <motion.div
      key={"stage-details"}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.2 }}
    >
      <Wrapper $vh={vh}>
        <OpenBoardFormStyled onSubmit={handleSubmit(onSubmit)}>
          <CloseBtn onClick={closeForm}>{crossIcon}</CloseBtn>
          <BoardIdInput
            register={register("boardId", {
              validate: async (value) => {
                if (value.length === 0) return false;
                const doesBoardExist = await fetchData(value);

                return doesBoardExist ? true : false;
              },
            })}
            placeholder="board id..."
          />
          {errors.boardId && (
            <ErrorInfo role="alert">invaild board id</ErrorInfo>
          )}
          <SubmitStyled type="submit" disabled={isSubmitting} value="Add" />
        </OpenBoardFormStyled>
      </Wrapper>
    </motion.div>
  );
}
