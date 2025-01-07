import { v4 as uuidv4 } from "uuid";

export default function TextArea({ className, title }) {
  const id = uuidv4();
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <textarea id={id} className={className} />
    </>
  );
}
