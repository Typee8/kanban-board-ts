import { useRef, useEffect } from "react";

type TextAreaProps = {
  className?: string;
  id?: string;
  placeholder?: string;
  register?: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

function TextArea({
  className,
  id,
  placeholder,
  register,
  onFocus,
  onBlur,
}: TextAreaProps) {
  const textAreaRef = useRef();

  useEffect(() => {
    textAreaRef.current.addEventListener("input", adjustHeight);
  }, []);

  const { ref: registerRef, ...restOfRegister } = register;
  const combineRefs = (node) => {
    textAreaRef.current = node;
    registerRef(node);
  };

  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={className}
      ref={combineRefs}
      {...restOfRegister}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

function adjustHeight(evt) {
  evt.target.style.height = "0px";
  const scrollHeight = evt.target.scrollHeight;
  evt.target.style.height = scrollHeight + "px";
}

export default TextArea;
