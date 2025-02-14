import styled from "styled-components";

const TaskCommentsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

type TaskCommentsProps = {
  commentData: {
    user: string;
    date: string;
    hour: string;
    comment: string;
  };
};

export default function TaskComments({ commentData }: TaskCommentsProps) {
  const { user, date, hour, comment } = commentData;
  return (
    <TaskCommentsStyled>
      <div>
        <span>{user}</span>
        <span>{`${date} at ${hour}`}</span>
      </div>
      <div>{comment}</div>
    </TaskCommentsStyled>
  );
}
