import styled from "styled-components";
import Form from "./forms/Form";
import { tablet } from "../devicesWidthStandard";
import ButtonStyled from "./styled/ButtonStyled";
import {
  addIcon,
  arrowForwardIcon,
  contentCopyIcon,
  crossIcon,
  visibilityIcon,
  visibilityOffIcon,
} from "../assets/svg_icons";
import { v4 as uuidv4 } from "uuid";
import { setData } from "../server/FirebaseAPI";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setBoardId } from "../store/slices/boardStateSlice";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
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

const NewBoardPanelStyled = styled.section`
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
NewBoardPanelStyled.displayName = "NewBoardPanelStyled";

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

const Description = styled.p`
  --font-size: 24px;
  text-align: center;
  font-size: var(--font-size);
  color: var(--contrast-primary-color);
`;
Description.displayName = "Description";

const FunctionalBtn = styled(ButtonStyled)`
  align-self: center;
  border: none;
  border-radius: 10px;
  background-color: var(--secondary-color);
  padding: 20px 40px;
  margin-block: auto;
  transition: all 0.2s ease;
  font-size: 24px;

  color: var(--contrast-primary-color);

  > * {
    width: 40px;
  }

  &:hover {
    color: var(--secondary-color);
    background-color: var(--contrast-primary-color);
  }

  @media (min-width: ${`${tablet}px`}) {
    margin-top: 150px;
  }
`;
FunctionalBtn.displayName = "FunctionalBtn";

const BoardIdView = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: var(--contrast-primary-color);
`;
const BoardIdShowBtn = styled(ButtonStyled)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: var(--contrast-primary-color);

  > * {
    width: 30px;
  }
`;
BoardIdShowBtn.displayName = "BoardIdShowBtn";

const BoardIdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`;
BoardIdContainer.displayName = "BoardIdContainer";

const newKanbanBoardData = [
  { title: "Queue", id: "firstStage" },
  { title: "In progress", id: "1" },
  { title: "Done", id: "lastStage" },
];

export default function NewBoardPanel({ close }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState("create");
  const [currentBoardId, setCurrentBoardId] = useState("");
  const [boardIdShown, setBoardIdShown] = useState(false);

  const createBoard = async () => {
    const id = uuidv4();
    await setData(newKanbanBoardData, id);
    dispatch(setBoardId(id));
    setCurrentBoardId(id);
    setState("copyId");
  };

  const copyBoardIdToClipboard = () => {
    navigator.clipboard
      ?.writeText(currentBoardId)
      .then(() => setState("proceed"));
  };

  return (
    <Wrapper>
      <NewBoardPanelStyled>
        <CloseBtn onClick={close}>{crossIcon}</CloseBtn>
        {state === "create" && (
          <>
            <Description>Click below to create new board</Description>
            <FunctionalBtn onClick={createBoard}>{addIcon}</FunctionalBtn>
          </>
        )}
        {state === "copyId" && (
          <>
            <Description>
              Below is your <strong>BOARD ID.</strong> <br />
              Save it somewhere safe.
            </Description>
            <BoardIdContainer>
              <BoardIdView>
                {boardIdShown ? currentBoardId : "********"}
              </BoardIdView>
              <BoardIdShowBtn
                onClick={() => setBoardIdShown(boardIdShown ? false : true)}
              >
                {boardIdShown ? visibilityOffIcon : visibilityIcon}
              </BoardIdShowBtn>
            </BoardIdContainer>

            <FunctionalBtn onClick={copyBoardIdToClipboard}>
              {contentCopyIcon}
            </FunctionalBtn>
          </>
        )}
        {state === "proceed" && (
          <>
            <Description>
              Your board is ready.
              <br /> Click below to proceed.
            </Description>
            <FunctionalBtn onClick={() => navigate("/board-panel")}>
              {arrowForwardIcon}
            </FunctionalBtn>
          </>
        )}
      </NewBoardPanelStyled>
    </Wrapper>
  );
}
