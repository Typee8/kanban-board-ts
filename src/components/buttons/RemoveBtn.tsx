import { ReactNode } from "react";

type RemoveBtnProps = {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function RemoveBtn({
  className,
  onClick,
  children,
}: RemoveBtnProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
