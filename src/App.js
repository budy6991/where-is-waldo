import { useState } from "react";
import "./App.css";
import waldo from "./assets/where-is-waldo.jpg";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  const [x, setX] = useState(null);
  const [markerX, setMarkerX] = useState(null);
  const [markerY, setMarkerY] = useState(null);
  const [className, setClassName] = useState(null);

  const between = (x, min, max) => {
    return x >= min && x <= max;
  };
  // ...
  // if (between(x, 0.001, 0.009)) {
  //   // something
  // }

  const showMarker = () => {
    alert("You found Waldo");
  };

  const showCoordinates = (e) => {
    setMarkerX(e.clientX - 24);
    setMarkerY(e.clientY - e.target.parentElement.offsetTop - 24);

    const x = Math.floor(e.clientX * 10000) / 100;
    const y = Math.floor(e.clientY * 10000) / 100;
    const responsiveX = window.innerWidth / x;
    const responsiveY = window.innerHeight / y;
    const finalX = responsiveX.toFixed(4);
    const finalY = responsiveY.toFixed(4);
    setX(finalX);

    if (between(finalX, 0.0159, 0.0165)) {
      alert("You found walding");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header />
      <div onClick={showCoordinates} className="relative">
        <img src={waldo} className="w-full h-4/12" />
        <div
          className="w-12 h-12 rounded-full border-2 border-red-500 bg-transparent absolute self-center"
          style={{ top: `${markerY}px`, left: `${markerX}px` }}
        ></div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
