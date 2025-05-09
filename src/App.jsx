import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./index.css";
import Page from "./components/Page";
import Pel from "./components/Pel/Pel";
import Flat from "./components/Pel Flat/Flat";
import PelX from "./components/Pel X/X";
import LandingPage from "./components/LandingPage/LandingPage";
import LandingPagePump from "./components/Pump/LandingPage";
import LandingPageApar from "./components/Apar/LandingPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/pel" element={<Pel />} />
        <Route path="/flat" element={<Flat />} />
        <Route path="/pelx" element={<PelX />} />
        <Route path="/lp" element={<LandingPage/>}/>
        <Route path="/pump" element={<LandingPagePump/>}/>
        <Route path="/apar" element={<LandingPageApar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
