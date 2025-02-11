export default function SettingsBtn({
  className,
  onClick,
}: {
  className: string;
  onClick: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}) {
  return (
    <button type="button" className={className} onClick={onClick}>
      &#9881;
    </button>
  );
}
