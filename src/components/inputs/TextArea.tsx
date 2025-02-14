import { v4 as uuidv4 } from "uuid";

export default function TextArea({
  className,
  title,
  register,
}: {
  className?;
  title?;
  register?;
}) {
  const id = uuidv4();
  return (
    <>
      {title ? <label htmlFor={id}>{title}</label> : null}
      <textarea id={id} className={className} {...register} />
    </>
  );
}
