import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        onClick={() => navigate("/game")}
        className="transition-all ease-in-out hover:scale-125 bg-red-600 p-6 text-4xl text-white rounded-xl"
      >
        Find Waldo!
      </button>
    </div>
  );
};
