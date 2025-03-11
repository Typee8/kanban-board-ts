import { useState } from "react";

export default function ArrowDropDown({ onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    console.log(isClicked);
    if (isClicked) {
      onClick(false);
      setIsClicked(false);
    } else {
      onClick(true);
      setIsClicked(true);
    }
  };

  return (
    <div onClick={handleClick}>
      {isClicked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="m280-400 200-200 200 200H280Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="M480-360 280-560h400L480-360Z" />
        </svg>
      )}
    </div>
  );
}
