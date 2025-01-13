const trashIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="48"
    height="48"
    fill="currentColor"
  >
    <path d="M3 6h18v2H3V6zm2 4h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10zm5 2v8h2v-8H10zm4 0v8h2v-8h-2zM9 2h6v2H9V2z" />
  </svg>
);

export default function RemoveBtn({
  className,
  onClick,
}: {
  className?: string;
  onClick?;
}) {
  return (
    <button className={className} onClick={onClick}>
      {trashIcon}
    </button>
  );
}
