import { ReactNode, forwardRef } from "react";
type ButtonProps = {
  $isShown?: boolean;
  className?: string;
  type?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", onClick, children }, ref) => {
    return (
      <button ref={ref} type={type} className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
);

export default Button;
