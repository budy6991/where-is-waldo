import React from "react";

export const Header = ({ time, waldo, odlaw, magician }) => {
  return (
    <div className="w-full h-fit flex justify-between content-center p-7 bg-red-600 items-center">
      <h1 className="text-white text-3xl">Where is Waldo</h1>
      <div className="flex justify-center gap-28 text-xl text-white italic">
        <p className={`${waldo ? "line-through" : ""} `}>Waldo</p>
        <p className={`${odlaw ? "line-through" : ""} `}>Odlaw</p>
        <p className={`${magician ? "line-through" : ""} `}>Magician</p>
      </div>

      <div className="flex justify-between items-between text-white text-xl">
        <p>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</p>
        <p>:</p>
        <p>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</p>
        <p>:</p>
        <p>{("0" + ((time / 10) % 1000)).slice(-2)}</p>
      </div>
    </div>
  );
};
