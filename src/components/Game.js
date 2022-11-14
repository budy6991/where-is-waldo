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
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const waldoCoordsRef = doc(db, "coordinates", "waldoCoordinates");
  const odlawCoordsRef = doc(db, "coordinates", "odlawCoordinates");
  const magicianCoordsRef = doc(db, "coordinates", "magicianCoordinates");

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
    setStart(true);
  }, []);

  useEffect(() => {
    if (start) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [start]);

  useEffect(() => {
    const checkCoordinates = () => {
      if (Waldo.xCoor === userClick.x && Waldo.yCoor === userClick.y) {
        setWaldoFound(true);
      } else if (Odlaw.xCoor === userClick.x && Odlaw.yCoor === userClick.y) {
        setOdlawFound(true);
      } else if (
        Magician.xCoor === userClick.x &&
        Magician.yCoor === userClick.y
      ) {
        setMagicianFound(true);
      }
    };

    const checkWin = () => {
      if (waldoFound && odlawFound && magicianFound) {
        setStart(false);
        setStart((state) => {
          console.log("start got to:" + state);
          return state;
        });
      } else {
        console.log("Not all characters found");
      }
    };

    if (!Object.keys(userClick).length) {
      console.log("No user Click");
    } else {
      checkCoordinates();
      checkWin();
      console.log(
        `Waldo Found ${waldoFound}, Odlaw Found: ${odlawFound} , Magician Found ${magicianFound}`
      );
    }
  }, [userClick]);

  useEffect(() => {
    //Listen for change on timer, takes time value, and prop from the user.
  }, []);

  const handleCoordinates = (e) => {
    const x = Math.floor((e.clientX / e.target.width) * 100);
    const y = Math.floor(
      ((e.clientY - e.target.getBoundingClientRect().top) / e.target.height) *
        100
    );
    setWaldoFound(true);
    setMagicianFound(true);
    setOdlawFound(true);
    return setUserClick({ x, y });
  };

  return (
    <>
      <Header time={time} />
      <div onClick={handleCoordinates} className="relative">
        <img src={waldo} className="w-full h-auto" />
      </div>
      <Footer />
    </>
  );
};
