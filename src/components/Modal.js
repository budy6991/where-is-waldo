import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, .7)",
  zIndex: 1000,
};

export const Modal = ({ open, time }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const scoreCollectionRef = collection(db, "score");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const addScore = async () => {
    try {
      await addDoc(scoreCollectionRef, {
        name: name,
        score: `${time.hours}:${time.minutes}:${time.seconds}`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
      window.location.reload(true);
    }
  };

  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES}></div>
      <div
        style={MODAL_STYLES}
        className="flex flex-col p-9 items-center gap-10 rounded-xl"
      >
        <h1>Congratulations! You found all the characters</h1>
        <div>
          <p>
            Score: {time.hours} : {time.minutes} : {time.seconds}
          </p>
        </div>
        <div>
          <form>
            <input
              onChange={handleName}
              type="text"
              placeholder="Enter your name"
              className="text-center border-2 border-red-600 rounded-full p-2"
            ></input>
          </form>
        </div>

        <button
          className="bg-red-600 p-2 rounded-xl text-white transition-all hover:scale-125"
          onClick={addScore}
        >
          Submit
        </button>
      </div>
    </>
  );
};
