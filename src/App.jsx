import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Page from "./components/Page";
import LandingPage from "./components/LandingPage/LandingPage";
import LeadsDashboard from "./components/dashboard/LeadsDashboard";

import LoginPage from "./components/dashboard/LoginPage";
import PrivateRoute from "./components/dashboard/PrivateRoute";
import CctvBohlam from "./components/Cctv/LandingPage";
import CctvBohlam1 from "./components/CctvUpdate/LandingPage";
import CctvBohlam2 from "./components/Cctv2/LandingPage";
import CctvGSO from "./components/CCTVGSO/LandingPage";
import OrderSummaryDashboard from "./components/dashboard/ShopifyStyleDashboard";
import AlatPijat from "./components/Pijat/LandingPage";
import BrandPage from "./components/BrandPage/Page";
import CatokASL from "./components/CatokASL/LandingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/lp" element={<LandingPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/cctv1" element={<CctvBohlam />} />
        <Route path="/cctv" element={<CctvBohlam1 />} />
        <Route path="/cctv2" element={<CctvBohlam2 />} />
        <Route path="/smart-cctv" element={<CctvGSO />} />
        <Route path="/pijat" element={<AlatPijat />} />
        <Route path="/catok" element={<CatokASL />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <LeadsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <OrderSummaryDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
