import { v4 as uuidv4 } from "uuid";

export default function Input({ className, title, type }) {
  const id = uuidv4();
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input id={id} type={type} className={className} />
    </>
  );
}
