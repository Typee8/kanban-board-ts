import { ReactNode, forwardRef } from "react";
type ButtonProps = {
  $isShown?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children }, ref) => {
    return (
      <button ref={ref} type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
);

export default Button;
