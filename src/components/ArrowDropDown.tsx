import { arrowDropDown, arrowDropUp } from "../assets/svg_icons";

export default function ArrowDropDown({ isFolded }) {
  return <div>{isFolded ? <>{arrowDropDown}</> : <>{arrowDropUp}</>}</div>;
}
