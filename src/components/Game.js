import React from "react";
import { useState } from "react";

import waldo from "../assets/where-is-waldo.jpg";

export const Game = () => {
  const [x, setX] = useState(null);
  const [markerX, setMarkerX] = useState(null);
  const [markerY, setMarkerY] = useState(null);
  const [className, setClassName] = useState(null);

  const between = (x, min, max) => {
    return x >= min && x <= max;
  };

  const showMarker = () => {
    alert("You found Waldo");
  };

  const showCoordinates = (e) => {
    setMarkerX(e.clientX - 24);

    // We get a reference to the parent element and we substract it from the current window, so on click we show the pointer exactly where it should be, since e.clientX only shows us relatively to the total screen.

    setMarkerY(e.clientY - e.target.parentElement.offsetTop - 24);

    const x = Math.floor(e.clientX * 10000) / 100;
    const y = Math.floor(e.clientY * 10000) / 100;
    const responsiveX = window.innerWidth / x;
    const responsiveY = window.innerHeight / y;
    const finalX = responsiveX.toFixed(4);
    const finalY = responsiveY.toFixed(4);
    setX(finalX);

    if (between(finalX, 0.0159, 0.0165)) {
      alert("You found walding");
    }
  };
  return (
    <div onClick={showCoordinates} className="relative">
      <img src={waldo} className="w-full h-4/12" />
      <div
        className="w-12 h-12 rounded-full border-2 border-red-500 bg-transparent absolute self-center"
        style={{ top: `${markerY}px`, left: `${markerX}px` }}
      ></div>
    </div>
  );
};
