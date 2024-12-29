import React, { useState } from "react";
import heart from '../Loader/heart.svg'

const HeartIcon = ({handleLikeClick}) => {
  // State to track whether the heart is liked
  const [isLiked, setIsLiked] = useState(false);

  // Function to toggle the heart color
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className=" absolute" onClick={handleLikeClick} >
      {}
      <svg
        onClick={toggleLike} // Handle click event
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isLiked ? "red" : "gray"} // Change color based on state
        width="40px"
        height="40px"
        style={{ cursor: "pointer" }}
      >
        <path  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.5 4 20 6.5 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />

      </svg>
    </div>
  );
};

export default HeartIcon;
