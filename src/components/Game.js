import React from "react";
import { useState } from "react";

import waldo from "../assets/where-is-waldo.jpg";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Game = () => {
  const [waldoCoordinates, setwWaldoCoordinates] = useState({ x: 61, y: 54 });

  const between = (x, min, max) => {
    return x >= min && x <= max;
  };

  const showMarker = () => {
    alert("You found Waldo");
  };

  const showCoordinates = (e) => {
    const x = Math.floor((e.clientX / window.innerWidth) * 100);

    const y = Math.floor((e.clientY / window.innerHeight) * 100);

    console.log("X", x);
    console.log("Y", y);
  };

  return (
    <>
      <Header />

      <div onClick={showCoordinates} className="relative">
        <img src={waldo} className="w-full h-full" />
      </div>

      <Footer />
    </>
  );
};
