export default function CloseBtn({
  className,
  onClick,
}: {
  className?: string;
  onClick?;
}) {
  return (
    <button className={className} onClick={onClick}>
      X
    </button>
  );
}
