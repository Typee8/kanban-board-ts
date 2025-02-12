type AddBtnProps = {
  $isShown?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AddBtn({ className, onClick }: AddBtnProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      +
    </button>
  );
}
