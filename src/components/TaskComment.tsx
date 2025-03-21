import styled from "styled-components";

type TaskCommentProps = {
  commentData: {
    user: string;
    date: string;
    hour: string;
    comment: string;
  };
};

const TaskCommentStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
  gap: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  background-color: var(--secondary-color);
`;

const TaskCommentContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  gap: 5px;
`;

const UserStyled = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const HourStyled = styled.span`
  font-weight: 300;
`;

const DateStyled = styled.span`
  position: absolute;
  top: 0;
  right: 0px;
  font-size: 14px;
  font-weight: 300;
`;

export default function TaskComment({ commentData }: TaskCommentProps) {
  const { user, date, hour, comment } = commentData;
  return (
    <TaskCommentStyled>
      <TaskCommentContainer>
        <UserStyled>{user}</UserStyled>
        <HourStyled>at {hour}</HourStyled>
        <DateStyled>{date}</DateStyled>
      </TaskCommentContainer>
      <div>{comment}</div>
    </TaskCommentStyled>
  );
}
