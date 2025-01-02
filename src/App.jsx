import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainContent from "./components/MainContent";

import "./index.css";
import Page from "./components/Page";
import Pel from "./components/Pel/Pel";
import Flat from "./components/Pel Flat/Flat";
import Flatl from "./components/Pel Flat L/Flat";
import MiniMop from "./components/Mini Mop/Mini";
import Eye from './components/Eye Cream/Eye'
import PelX from './components/Pel X/X'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/shaver" element={<MainContent />} />
        <Route path="/pel" element={<Pel />} />
        <Route path="/flat" element={<Flat />} />
        <Route path="/flatl" element={<Flatl />} />
        <Route path="/minimop" element={<MiniMop />} />
        <Route path="/eyecream" element={<Eye />} />
        <Route path="/pelx" element={<PelX />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
