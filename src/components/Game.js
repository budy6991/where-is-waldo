import React, { useEffect } from "react";
import { useState } from "react";
import waldo from "../assets/where-is-waldo.jpg";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { db } from "../firebase-config";
import {
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

export const Game = () => {
  const [Waldo, setWaldo] = useState({});
  const [Odlaw, setOdlaw] = useState({});
  const [Magician, setMagician] = useState({});
  const [userClick, setUserClick] = useState({});
  const [waldoFound, setWaldoFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  const [magicianFound, setMagicianFound] = useState(false);

  const waldoCoordsRef = doc(db, "coordinates", "waldoCoordinates");
  const odlawCoordsRef = doc(db, "coordinates", "odlawCoordinates");
  const magicianCoordsRef = doc(db, "coordinates", "magicianCoordinates");
  const characterCollection = collection(db, "coordinates");

  useEffect(() => {
    const getWaldoCoords = async () => {
      const data = await getDoc(waldoCoordsRef);
      return setWaldo(data.data());
    };
    const getOdlawCoords = async () => {
      const data = await getDoc(odlawCoordsRef);
      return setOdlaw(data.data());
    };
    const getMagicianCoords = async () => {
      const data = await getDoc(magicianCoordsRef);
      return setMagician(data.data());
    };
    getWaldoCoords();
    getOdlawCoords();
    getMagicianCoords();
  }, []);

  const checkForWin = () => {
    if (waldoFound === true && odlawFound === true && magicianFound === true) {
      alert("you won the game");
    }
  };

  const compareCoordinates = async () => {
    if (userClick.x === Waldo.xCoor && userClick.y === Waldo.yCoor) {
      setWaldoFound(true);
      alert("found waldo");
    } else if (userClick.x === Odlaw.xCoor && userClick.y === Odlaw.yCoor) {
      setOdlawFound(true);
      alert("Found odlaw");
    } else if (
      userClick.x === Magician.xCoor &&
      userClick.y === Magician.yCoor
    ) {
      setMagicianFound(true);
      alert("Found magician");
    }
  };

  const handleCoordinates = (e) => {
    const x = Math.floor((e.clientX / e.target.width) * 100);
    const y = Math.floor(
      ((e.clientY - e.target.getBoundingClientRect().top) / e.target.height) *
        100
    );
    setUserClick({ x, y });
    compareCoordinates();
    checkForWin()
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
