import { ReactNode, forwardRef } from "react";
type ButtonProps = {
  $isShown?: boolean;
  className?: string;
  disabled?: boolean;
  type?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = "button",
      disabled = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={className}
        onClick={onClick}
        {...props}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default Button;
