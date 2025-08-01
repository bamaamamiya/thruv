import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Page from "./components/Page";
import LandingPage from "./components/LandingPage/LandingPage";
import LandingPagePump from "./components/Pump/LandingPage";
import LandingPageApar from "./components/Apar/LandingPage";
import LeadsDashboard from "./components/dashboard/LeadsDashboard";

import LoginPage from "./components/dashboard/LoginPage";
import PrivateRoute from "./components/dashboard/PrivateRoute";
import CctvBohlam from "./components/Cctv/LandingPage";
import AlatPijat from './components/Pijat/LandingPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/lp" element={<LandingPage />} />
        <Route path="/pump" element={<LandingPagePump />} />
        <Route path="/apar" element={<LandingPageApar />} />
        <Route path="/cctv" element={<CctvBohlam />} />
        <Route path="/pijat" element={<AlatPijat />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <LeadsDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
