import React, { useEffect } from "react";
import { useState } from "react";
import waldo from "../assets/where-is-waldo.jpg";
import { Footer } from "./Footer";
import { Header } from "./Header";
// import { db } from "../firebase-config";
// import { collection } from "firebase/firestore";

export const Game = () => {
  const [waldoCoordinates, setWaldoCoordinates] = useState({});
  // const waldCoordsRef = collection(db, "coordinates/waldoCoordinates");

  // useEffect(() => {
  //   const getWaldoCoords = async () => {};
  // }, []);

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
