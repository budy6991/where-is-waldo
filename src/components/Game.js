import React, { useEffect } from "react";
import { useState } from "react";
import waldo from "../assets/where-is-waldo.jpg";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { db } from "../firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export const Game = () => {
  const [waldoCoordinates, setWaldoCoordinates] = useState({});

  const waldoCoordsRef = doc(db, "coordinates", "waldoCoordinates");

  useEffect(() => {
    const getWaldoCoords = async () => {
      const data = await getDoc(waldoCoordsRef);
      return setWaldoCoordinates(data.data());
    };
    getWaldoCoords();
  }, []);

  const between = (x, min, max) => {
    return x >= min && x <= max;
  };

  const showMarker = () => {
    alert("You found Waldo");
  };

  //If the click equals to waldoCoordinates.
  //Give margin to the waldoCoordinates.

  const handleCoordinates = (e) => {
    const x = Math.floor((e.clientX / e.target.width) * 100);
    const y = Math.floor(
      ((e.clientY - e.target.getBoundingClientRect().top) / e.target.height) *
        100
    );

    console.log(waldoCoordinates.yCoor);
  };

  return (
    <>
      <Header />
      <div onClick={handleCoordinates} className="relative">
        <img src={waldo} className="w-full h-auto" />
      </div>
      <Footer />
    </>
  );
};
