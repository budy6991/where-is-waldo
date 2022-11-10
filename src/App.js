import { useState } from "react";
import "./App.css";
import waldo from "./assets/where-is-waldo.jpg";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Game } from "./components/Game";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
