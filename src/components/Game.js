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

  useEffect(() => {
    onSnapshot(characterCollection, (snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(doc.data().found);
      });
    });
  }, []);

  const foundCharacter = async (ref) => {
    try {
      await updateDoc(ref, { found: true });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Updated");
    }
  };

  const compareCoordinates = async () => {
    if (userClick.x === Waldo.xCoor && userClick.y === Waldo.yCoor) {
      foundCharacter(waldoCoordsRef);
    } else if (userClick.x === Odlaw.xCoor && userClick.y === Odlaw.yCoor) {
      foundCharacter(odlawCoordsRef);
    } else if (
      userClick.x === Magician.xCoor &&
      userClick.y === Magician.yCoor
    ) {
      foundCharacter(magicianCoordsRef);
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
