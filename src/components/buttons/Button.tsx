import { ReactNode } from "react";
type ButtonProps = {
  $isShown?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

export default function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
