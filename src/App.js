import { useState } from "react";
import "./App.css";
import waldo from "./assets/where-is-waldo.jpg";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  const showCoordinates = (e) => {
    const x = Math.floor(e.clientX * 10000) / 100;
    const y = Math.floor(e.clientY * 10000) / 100;
    console.log(window.innerWidth / x);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header />
      <div onClick={showCoordinates}>
        <img src={waldo} className="w-full h-4/12" />
      </div>

      <Footer />
    </div>
  );
}

export default App;
