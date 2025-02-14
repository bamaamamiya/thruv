import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./index.css";
import MainContent from "./components/Shaver/MainContent";
import Page from "./components/Page";
import Pel from "./components/Pel/Pel";
import Flat from "./components/Pel Flat/Flat";
import Flat2 from "./components/Pel Flat 2/Flat2";
import Flatl from "./components/Pel Flat L/Flat";
import MiniMop from "./components/Mini Mop/Mini";
import Eye from "./components/Eye Cream/Eye";
import PelX from "./components/Pel X/X";
import Test from './components/Test'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/shaver" element={<MainContent />} />
        <Route path="/pel" element={<Pel />} />
        <Route path="/flat" element={<Flat />} />
        <Route path="/pel-premium" element={<Flat2 />} />
        <Route path="/flatl" element={<Flatl />} />
        <Route path="/minimop" element={<MiniMop />} />
        <Route path="/eyecream" element={<Eye />} />
        <Route path="/pelx" element={<PelX />} />
        <Route path="test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
