import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button onClick={() => navigate("/game")}>Play!</button>
    </div>
  );
};
