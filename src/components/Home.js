import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";

export const Home = () => {
  const [score, setScore] = useState([]);
  const scoreCollectionRef = collection(db, "score");
  const navigate = useNavigate();

  useEffect(() => {
    const getScore = async () => {
      const data = await getDocs(scoreCollectionRef);
      setScore(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      console.log(data);
    };
    getScore();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-20 bg-gradient-to-br from-yellow-300 to-orange-300">
      <div className="w-1/3 text-justify text-lg italic">
        <p>
          In the next game you will have to find the three characters of Waldo's
          story: Waldo, Odlaw and the Magician. Upon completition you will be
          asked to input your name to store your score in our database ... Good
          Luck!
        </p>
      </div>
      <button
        onClick={() => navigate("/game")}
        className="transition-all ease-in-out hover:scale-125 bg-red-600 p-6 text-4xl text-white rounded-xl shadow-lg"
      >
        Find Waldo!
      </button>
      <div className="border-2 border-red-600 w-[350px] h-[300px] p-10  rounded-xl flex flex-col justify-between shadow-xl gap-10">
        <div className="text-center text-white text-xl bg-red-600 w-full rounded-xl">
          Score History
        </div>
        <div className="overflow-x-hidden  scrollbar scrollbar-rounded-full scrollbar-thumb-transparent scrollbar-white p-4 text-blue-900">
          {score.map((item) => {
            return (
              <div className="flex gap-10 justify-between hover:scale-105">
                <h1>{item.name}</h1>
                <h1>{item.score}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
