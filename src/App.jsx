import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Page from "./components/Page";
import CctvBohlam from "./components/Cctv/LandingPage";
import CctvBohlam1 from "./components/CctvUpdate/LandingPage";
import CctvBohlam2 from "./components/Cctv2/LandingPage";
import BrandPage from "./components/BrandPage/Page";
import CctvBohlamDB from "./components/CctvDB/LandingPage";
import SpeakerMini from "./components/Speaker/LandingPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/cctv1" element={<CctvBohlam />} />
        <Route path="/cctvlama" element={<CctvBohlam1 />} />
        <Route path="/cctv" element={<CctvBohlamDB />} />
        <Route path="/speaker" element={<SpeakerMini />} />
        <Route path="/cctv-smart" element={<CctvBohlam2 />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
